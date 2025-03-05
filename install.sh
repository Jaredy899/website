#!/bin/sh -e

# Source the common scripts directly from GitHub
eval "$(curl -s https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/common_script.sh)"
eval "$(curl -s https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/common_service_script.sh)"

# Run the environment check
checkEnv || exit 1
checkDistro

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

# Display completion message
printf "%b\n" "${GREEN}Installation completed successfully!${RC}"
printf "%b\n" "${CYAN}To start the development server, run:${RC}"
printf "%b\n" "${CYAN}pnpm dev${RC}" 