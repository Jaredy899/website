#!/bin/sh -e

# Source the common scripts directly from GitHub
eval "$(curl -s https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/common_script.sh)"
eval "$(curl -s https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/common_service_script.sh)"

# Run the environment check
checkEnv || exit 1
checkDistro

# Function to configure firewall
configure_firewall() {
    printf "%b\n" "${YELLOW}Configuring firewall for development server...${RC}"
    
    # Check for firewalld
    if command_exists firewall-cmd; then
        printf "%b\n" "${YELLOW}Using firewalld...${RC}"
        "$ESCALATION_TOOL" firewall-cmd --add-port=3000/tcp --permanent
        "$ESCALATION_TOOL" firewall-cmd --reload
        printf "%b\n" "${GREEN}Firewall configured successfully for port 3000.${RC}"
    # Check for ufw
    elif command_exists ufw; then
        printf "%b\n" "${YELLOW}Using ufw...${RC}"
        "$ESCALATION_TOOL" ufw allow 3000/tcp
        "$ESCALATION_TOOL" ufw reload
        printf "%b\n" "${GREEN}Firewall configured successfully for port 3000.${RC}"
    else
        printf "%b\n" "${YELLOW}No supported firewall found. Please configure port 3000 manually.${RC}"
    fi
}

# Function to source shell configuration
source_shell_config() {
    if [ -f "$HOME/.bashrc" ]; then
        printf "%b\n" "${YELLOW}Sourcing bash configuration...${RC}"
        . "$HOME/.bashrc"
    elif [ -f "$HOME/.zshrc" ]; then
        printf "%b\n" "${YELLOW}Sourcing zsh configuration...${RC}"
        . "$HOME/.zshrc"
    else
        printf "%b\n" "${RED}No shell configuration file found. Please create one and add:${RC}"
        printf "%b\n" "${YELLOW}export PNPM_HOME=\"\$HOME/.local/share/pnpm\"${RC}"
        printf "%b\n" "${YELLOW}export PATH=\"\$PNPM_HOME:\$PATH\"${RC}"
        exit 1
    fi
}

# Function to install Node.js and pnpm
install_nodejs() {
    if ! command_exists node; then
        printf "%b\n" "${YELLOW}Installing Node.js...${RC}"
        case "$PACKAGER" in
            pacman)
                "$ESCALATION_TOOL" "$PACKAGER" -Sy --noconfirm nodejs npm
                ;;
            xbps-install)
                "$ESCALATION_TOOL" "$PACKAGER" -Sy nodejs npm
                ;;
            apt-get|nala|zypper|dnf)
                "$ESCALATION_TOOL" "$PACKAGER" install -y nodejs npm
                ;;
            apk)
                "$ESCALATION_TOOL" apk add nodejs npm
                ;;
            *)
                printf "%b\n" "${RED}Unsupported package manager. Please install Node.js manually.${RC}"
                exit 1
                ;;
        esac
        printf "%b\n" "${GREEN}Node.js installed successfully.${RC}"
    else
        printf "%b\n" "${GREEN}Node.js is already installed.${RC}"
    fi

    # Install pnpm if not present
    if ! command_exists pnpm; then
        printf "%b\n" "${YELLOW}Installing pnpm...${RC}"
        curl -fsSL https://get.pnpm.io/install.sh | sh -
        printf "%b\n" "${GREEN}pnpm installed successfully.${RC}"
        
        # Source shell configuration to make pnpm available
        source_shell_config
        
        # Verify pnpm is now available
        if ! command_exists pnpm; then
            printf "%b\n" "${RED}Failed to make pnpm available. Please try running:${RC}"
            printf "%b\n" "${YELLOW}source ~/.bashrc${RC}"
            exit 1
        fi
    else
        printf "%b\n" "${GREEN}pnpm is already installed.${RC}"
    fi
}

# Function to install Git if not present
install_git() {
    if ! command_exists git; then
        printf "%b\n" "${YELLOW}Installing Git...${RC}"
        case "$PACKAGER" in
            pacman)
                "$ESCALATION_TOOL" "$PACKAGER" -Sy --noconfirm git
                ;;
            xbps-install)
                "$ESCALATION_TOOL" "$PACKAGER" -Sy git
                ;;
            apt-get|nala|zypper|dnf)
                "$ESCALATION_TOOL" "$PACKAGER" install -y git
                ;;
            apk)
                "$ESCALATION_TOOL" apk add --no-cache git
                ;;
            *)
                printf "%b\n" "${RED}Unsupported package manager. Please install Git manually.${RC}"
                exit 1
                ;;
        esac
        printf "%b\n" "${GREEN}Git installed successfully.${RC}"
    else
        printf "%b\n" "${GREEN}Git is already installed.${RC}"
    fi
}

# Function to install project dependencies
install_dependencies() {
    printf "%b\n" "${YELLOW}Installing project dependencies...${RC}"
    pnpm install
    printf "%b\n" "${GREEN}Project dependencies installed successfully.${RC}"
}

# Function to create .env file if it doesn't exist
setup_env() {
    if [ ! -f .env ]; then
        printf "%b\n" "${YELLOW}Creating .env file...${RC}"
        cp .env.example .env
        printf "%b\n" "${GREEN}Created .env file. Please edit it with your configuration.${RC}"
    else
        printf "%b\n" "${GREEN}.env file already exists.${RC}"
    fi
}

# Main script
printf "%b\n" "${CYAN}Starting installation for jaredcervantes.com...${RC}"

# Install required tools
install_nodejs
install_git

# Setup project
setup_env

# Install dependencies
install_dependencies

# Configure firewall
configure_firewall

# Display completion message
printf "%b\n" "${GREEN}Installation completed successfully!${RC}"
printf "%b\n" "${CYAN}To start the development server, run:${RC}"
printf "%b\n" "${CYAN}pnpm dev${RC}" 