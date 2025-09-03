# AI Media Studio - Canva-like Image/Video Generator

A professional media editing application built with Next.js that combines AI-powered image generation with comprehensive editing tools.

## 🚀 Features

### AI-Powered Generation
- **Stable Diffusion Integration**: Generate high-quality images from text prompts
- **Customizable Parameters**: Control dimensions, steps, guidance scale, and negative prompts
- **Real-time Preview**: See your generated images instantly

### Professional Editing Tools
- **Advanced Filters**: Apply professional-grade filters with real-time preview
- **Manual Adjustments**: Fine-tune brightness, contrast, saturation, and blur
- **Filter Presets**: Quick access to popular filter combinations (Vintage, Dramatic, Cool, Warm, etc.)

### Background Processing
- **AI Background Removal**: Remove backgrounds automatically with AI precision
- **Transparent Export**: Export images with transparent backgrounds

### Watermarking System
- **Custom Text Watermarks**: Add personalized watermarks to your images
- **Flexible Positioning**: Place watermarks in any corner or center
- **Style Customization**: Adjust opacity, size, and color
- **Real-time Preview**: See watermark changes instantly

### Export & Sharing
- **Multiple Formats**: Download in PNG, JPG, and other formats
- **Direct Sharing**: Share to social media or copy to clipboard
- **High Quality Export**: Maintain image quality during export

## 🛠 Technology Stack

- **Frontend**: Next.js 13+ with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Image Processing**: HTML5 Canvas API
- **File Handling**: React Dropzone
- **Color Picker**: React Colorful
- **State Management**: React Hooks
- **Notifications**: Sonner Toast

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and toaster
│   ├── page.tsx            # Landing page with features showcase
│   └── editor/
│       └── page.tsx        # Main editor interface
├── components/
│   └── editor/
│       ├── FileUpload.tsx      # Drag & drop file upload
│       ├── AIGenerator.tsx     # Stable Diffusion interface
│       ├── FilterPanel.tsx     # Filter controls and presets
│       ├── WatermarkPanel.tsx  # Watermark customization
│       ├── BackgroundRemover.tsx # AI background removal
│       └── CanvasEditor.tsx    # Canvas-based image editor
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── cloudinary.ts          # Cloudinary integration
│   └── stable-diffusion.ts    # AI API integration
└── types/
    └── editor.ts              # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-media-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STABLE_DIFFUSION_API_KEY=your_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🎨 Features Overview

### AI Image Generation
- Text-to-image generation using Stable Diffusion
- Customizable parameters (dimensions, steps, guidance)
- Negative prompt support for better control
- Real-time generation status and progress

### Professional Editing
- **Filters**: Vintage, Dramatic, Cool, Warm, Black & White, Soft
- **Manual Controls**: Brightness, Contrast, Saturation, Blur
- **Real-time Preview**: See changes instantly
- **Non-destructive Editing**: Original image preserved

### Advanced Features
- **Background Removal**: AI-powered background extraction
- **Watermarking**: Custom text with full styling control
- **Export Options**: Multiple formats and sharing capabilities
- **Responsive Design**: Works perfectly on all devices

## 🔧 API Integration

### Stable Diffusion API
The application includes a mock implementation for Stable Diffusion. To use a real API:

1. Replace the mock functions in `lib/stable-diffusion.ts`
2. Implement actual API calls to your preferred provider
3. Add proper error handling and loading states

### Cloudinary Integration
For production use:

1. Create a Cloudinary account
2. Set up upload presets
3. Configure environment variables
4. Enable auto-upload for seamless media management

## 🎯 Usage Guide

1. **Upload or Generate**: Start by uploading an image or generating one with AI
2. **Apply Filters**: Use presets or manual controls to enhance your image
3. **Add Watermarks**: Customize text watermarks with your branding
4. **Remove Background**: Use AI to remove backgrounds automatically
5. **Export & Share**: Download your creation or share it directly

## 🌟 Key Benefits

- **Professional Quality**: Industry-standard editing tools
- **AI-Powered**: Leverage cutting-edge AI for generation and processing
- **User-Friendly**: Intuitive interface suitable for all skill levels
- **Fast Performance**: Optimized for speed and responsiveness
- **Mobile Ready**: Fully responsive design for all devices

## 📈 Performance Optimizations

- **Client-side Processing**: Canvas-based editing for instant feedback
- **Lazy Loading**: Components loaded only when needed
- **Optimized Images**: Automatic image optimization with Next.js
- **Efficient State Management**: Minimal re-renders and optimal updates

## 🔐 Security Features

- **Client-side Processing**: Images processed locally for privacy
- **Secure Upload**: Cloudinary integration with secure uploads
- **Environment Variables**: Sensitive data properly secured
- **CORS Handling**: Proper cross-origin resource sharing

## 🚀 Deployment

The application is configured for static export and can be deployed to any hosting platform:

```bash
npm run build
npm run export
```

Deploy the `out` folder to your preferred hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, please open an issue on GitHub or contact our support team.

---

Built with ❤️ using Next.js and modern web technologies.