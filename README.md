
# KuCoin Balance Modifier Chrome Extension

## Overview

The KuCoin Balance Modifier is a Chrome extension designed to simulate the modification of balance and margin values on the KuCoin exchange's web interface. This tool is useful for demonstration or testing purposes, allowing you to adjust displayed values without affecting the actual data on the server.

## Features

- Modify the displayed values of Total Assets and Margin on the KuCoin trading interface.
- Real-time updates every millisecond to ensure smooth display changes.
- Prevents text from wrapping into multiple lines by applying custom CSS styling.

## Installation

### How to Load the Extension into Chrome

1. **Download the Project**: If you haven't already, download or clone the project files to your computer.

2. **Extract the Files**: Unzip the downloaded project folder to a convenient location.

3. **Open Chrome Extensions Page**:
   - Open Google Chrome.
   - In the address bar, type `chrome://extensions/` and press Enter.

4. **Enable Developer Mode**:
   - In the top-right corner of the extensions page, toggle the switch to enable "Developer mode."

5. **Load the Unpacked Extension**:
   - Click on the "Load unpacked" button.
   - In the file dialog that appears, navigate to the folder where you extracted the project files.
   - Select the folder named `kucoin-balance-modifier` and click "Select Folder."

6. **Extension Loaded**:
   - The KuCoin Balance Modifier extension should now appear in your list of installed extensions.

### How to Use the Extension

1. **Open the KuCoin Website**: Navigate to the KuCoin exchange in your Chrome browser.

2. **Activate the Extension**:
   - Click on the KuCoin Balance Modifier extension icon in the Chrome toolbar.
   - A popup window will appear.

3. **Modify Values**:
   - Enter the desired values for Total Assets and Margin.
   - Click the "Apply Changes" button.

4. **View Changes**: The changes should now be reflected on the KuCoin web page in real-time.

### Files Description

- **manifest.json**: Contains metadata about the extension, including its name, version, and permissions.
- **popup.html**: Defines the user interface for the extension's popup.
- **popup.js**: Contains the logic that applies changes to the KuCoin interface.

## Notes

- This extension does not interact with the KuCoin server and only modifies the values displayed on your local browser.
- Use this tool for testing or educational purposes only.

## License

This project is licensed under the MIT License.
