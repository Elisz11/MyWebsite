import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import fetch from 'node-fetch';

const PHOTOS_DIR = 'public/photos/full';
const OUTPUT_FILE = 'src/assets/gallery.json';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getPlaceName(lat, lng) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
            { headers: { 'Accept-Language': 'en-US', 'User-Agent': 'PhotoProject' } }
        );
        const data = await response.json();
        
        const addr = data.address;
        
        return addr.city || 
               addr.town || 
               addr.village || 
               addr.suburb || 
               addr.county || 
               "Unknown Location";
               
    } catch (e) { 
        return "Location unavailable"; 
    }
}

async function process() {
    const files = fs.readdirSync(PHOTOS_DIR).filter(f => f.toLowerCase().endsWith('.jpg'));
    const galleryData = [];

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const filePath = path.join(PHOTOS_DIR, file);
        
        const data = await exifr.parse(filePath, { gps: true, timestamp: true });
        
        let place = null;
        if (data?.latitude) {
            place = await getPlaceName(data.latitude, data.longitude);
            await delay(1000);
        }

        let formattedDate = null;
        if (data?.DateTimeOriginal) {
            formattedDate = data.DateTimeOriginal.toISOString();
        }

        const webpFilename = file.replace(/\.jpg$/i, '.webp');

        galleryData.push({
            filename: file,
            url: `./photos/optimized/${webpFilename}`,
            downloadUrl: `./photos/full/${file}`,
            date: formattedDate,
            lat: data?.latitude || null,
            lng: data?.longitude || null,
            place: place
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    console.log(`Success! Saved ${galleryData.length} items to ${OUTPUT_FILE}`);
}

process();