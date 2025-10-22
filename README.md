# 3er Combo - Custom Gutenberg Block

A modern WordPress Gutenberg block for displaying art projects with rich text content and up to 3 images.

## Features

- **Block API Version 3** - Fully compatible with WordPress 6.3+ and iframe editor
- **Rich Text Editor** - Add formatted content with WordPress's RichText component
- **Image Gallery** - Select up to 3 images from WordPress media library
- **Image Management** - Remove individual images with convenient delete buttons
- **Responsive Design** - Mobile-friendly with adaptive layouts
- **Modern WordPress Standards** - Uses `useBlockProps()` for iframe compatibility
- **Alignment Support** - Built-in support for block alignment
- **Spacing Controls** - Customizable margin and padding

## Requirements

- WordPress 6.3 or higher (for Block API v3 support)
- PHP 7.4 or higher
- Modern browser with JavaScript enabled

## Installation

1. Copy the block folder to your WordPress theme or plugin directory
2. Register the block in your theme's `functions.php` or plugin main file:

```php
function register_combo_block() {
    register_block_type( __DIR__ . '/path-to-block' );
}
add_action( 'init', 'register_combo_block' );
```

## Usage

1. In the WordPress editor, click the **+** button to add a new block
2. Search for "3er Combo" or find it in the Widgets category
3. Add your text content in the main editor area
4. Use the sidebar panel to select up to 3 images
5. Remove images individually using the X button on each image
6. Publish or update your post/page

## Block Structure

```
custom-gutenberg-block/
├── block.json          # Block metadata and configuration
├── index.js            # Block registration and logic
├── editor.css          # Editor-only styles
├── style.css           # Frontend styles
└── README.md           # Documentation
```

## Technical Details

- **Block Name:** `tripolt-25/combo-03`
- **Category:** Widgets
- **API Version:** 3
- **Text Domain:** tripolt-25
- **Icon:** images-alt2

## Customization

### Changing Image Limit

Edit `index.js` line 32-36 to modify the maximum number of images:

```javascript
// Change 3 to your desired limit
if (updatedImages.length > 3) {
    setAttributes({ images: updatedImages.slice(0, 3) });
}
```

### Styling

- **Frontend:** Edit `style.css` for public-facing styles
- **Editor:** Edit `editor.css` for editor-specific styles

## Changelog

### Version 1.0.0 (2025)
- ✅ Updated to Block API Version 3
- ✅ Added `useBlockProps()` for iframe compatibility
- ✅ Modernized JavaScript with ES6+ syntax
- ✅ Added image removal functionality
- ✅ Improved UI with empty state messaging
- ✅ Enhanced CSS with responsive design
- ✅ Added frontend stylesheet
- ✅ Added alignment and spacing support
- ✅ Improved accessibility and user experience

## License

This block is provided as-is for art project display purposes.
