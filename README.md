# FindThem - Missing Persons Web Application

A modern, full-stack web application to help families find missing persons in Kenya. Built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Home Page**: Hero section with search functionality and latest missing persons
- **Search Page**: Advanced filtering by name, gender, region, and status
- **Report Missing Person**: Comprehensive form with photo upload
- **Person Details**: Full information display with contact details
- **About & Contact**: Information about the platform and how to help
- **Mobile Responsive**: Works seamlessly on all devices
- **Smooth Animations**: Framer Motion for polished user experience

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **shadcn/ui**: High-quality React components
- **Lucide React**: Beautiful icon library

### Backend
- **Next.js API Routes**: RESTful API endpoints
- **Supabase**: PostgreSQL database and authentication
- **Supabase Storage**: Image hosting

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── persons/          # CRUD endpoints for missing persons
│   │   └── upload/           # Image upload endpoint
│   ├── about/                # About page
│   ├── person/[id]/          # Person details page
│   ├── report/               # Report missing person form
│   ├── search/               # Search page with filters
│   ├── layout.tsx            # Root layout with navigation
│   └── page.tsx              # Home page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── Navigation.tsx        # Main navigation component
│   └── PersonCard.tsx        # Missing person card component
├── lib/
│   ├── database.types.ts     # TypeScript types for database
│   ├── supabase.ts           # Supabase client configuration
│   └── utils.ts              # Utility functions
└── supabase/
    └── migrations/           # Database migrations (managed via Supabase)
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Environment Variables

The following environment variables are already configured in `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. The database schema and storage bucket are already set up via Supabase migrations.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Missing Persons Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| full_name | text | Full name of missing person |
| age | integer | Age (1-150) |
| gender | text | Male, Female, or Other |
| region | text | Geographic region |
| last_seen_location | text | Last known location |
| date_missing | date | Date person went missing |
| contact_number | text | Contact for information |
| status | text | "missing" or "found" |
| photo_url | text | URL to uploaded photo |
| description | text | Additional details |
| created_at | timestamptz | Report creation time |
| updated_at | timestamptz | Last update time |

### Security (RLS Policies)

- **Public Read**: Anyone can view missing persons
- **Public Insert**: Anyone can report missing persons
- **Authenticated Update/Delete**: Only authenticated users (admins) can modify or delete records

## API Endpoints

### GET /api/persons
Retrieve all missing persons with optional filters.

**Query Parameters:**
- `query` - Search by name or location
- `gender` - Filter by gender (Male, Female, Other)
- `region` - Filter by region
- `status` - Filter by status (missing, found)
- `limit` - Limit number of results

**Response:**
```json
[
  {
    "id": "uuid",
    "full_name": "John Doe",
    "age": 25,
    "gender": "Male",
    "region": "Nairobi",
    "last_seen_location": "CBD",
    "date_missing": "2024-01-15",
    "contact_number": "+254 700 000 000",
    "status": "missing",
    "photo_url": "https://...",
    "description": "...",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
]
```

### POST /api/persons
Create a new missing person report.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "age": 25,
  "gender": "Male",
  "region": "Nairobi",
  "last_seen_location": "CBD",
  "date_missing": "2024-01-15",
  "contact_number": "+254 700 000 000",
  "status": "missing",
  "photo_url": "https://...",
  "description": "..."
}
```

### GET /api/persons/[id]
Retrieve details of a specific missing person.

### PUT /api/persons/[id]
Update a missing person record (requires authentication).

### DELETE /api/persons/[id]
Delete a missing person record (requires authentication).

### POST /api/upload
Upload a photo for a missing person report.

**Request:** FormData with `file` field
**Response:**
```json
{
  "url": "https://supabase-storage-url/..."
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Import your repository in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy! Vercel will automatically build and deploy your app.

### Build for Production

```bash
npm run build
npm run start
```

## Features Roadmap

### Completed
- ✅ Database schema with RLS policies
- ✅ Full CRUD API endpoints
- ✅ Home page with latest reports
- ✅ Advanced search with filters
- ✅ Report missing person form
- ✅ Person details page
- ✅ About & contact page
- ✅ Photo upload functionality
- ✅ Mobile responsive design
- ✅ Smooth animations

### Optional Enhancements
- 📧 Email notifications for new reports
- 🌓 Dark/light theme toggle
- 📄 Pagination for search results
- 🔍 "Recently Found" filter
- 📱 Progressive Web App (PWA)
- 🗺️ Map integration for locations
- 📊 Analytics dashboard for admins
- 🔐 Admin authentication system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For support or questions:
- Email: info@findthem.co.ke
- Phone: +254 700 000 000

## Emergency Contacts

If you have urgent information about a missing person, contact:
- Kenya Police: 999
- Emergency Services: 112

---

Built with ❤️ to help reunite families in Kenya.
