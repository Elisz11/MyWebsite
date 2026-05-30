<script setup>
    import NavBar from '../components/NavBar.component.vue'
    import Footer from '../components/Footer.component.vue'
	import Photo from '../components/Photo.component.vue';
    import { ref, onMounted, computed } from 'vue';
	import galleryData from '../assets/gallery.json';


    const gallery = ref([]);
	const selectedPhoto = ref(null);

    onMounted(async () => {
        try {
            gallery.value = galleryData.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (e) {
            console.error("Failed to load gallery data", e);
        }
    });

</script>

<template>
  	<NavBar />
	<Photo v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />

  	<div class="flex-1 flex flex-col items-center justify-center">
    	<div class="w-full max-w-5xl p-2">
      
			<header class="text-center">
				<h1 class="text-5xl font-bold">My Photos</h1>
				<p class="text-amber-500 p-2">
				Tip: Click the place name to view it on Google Maps
				</p>
			</header>

			<section class="w-full">
				<div class="flex items-center justify-between pb-2">
					<h2 class="text-2xl">Archive</h2>
					<span class="text-sm">{{ gallery.length }} items</span>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<div v-for="photo in gallery" :key="photo.id" class="group relative aspect-square overflow-hidden rounded-lg" @click="selectedPhoto = photo">
						<img
							:src="photo.url"
							:alt="photo.name"
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					
						<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
							<p class="text-white text-xs">{{ new Date(photo.date).toLocaleDateString() }}</p>
							<a v-if="photo.place" :href="`https://www.google.com/maps/search/?api=1&query=${photo.lat},${photo.lng}`" target="_blank" class=" text-sm font-bold hover:underline " @click.stop>{{ photo.place }}</a>
							<a :href="photo.downloadUrl" download class="text-white p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors" @click.stop>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							</a>
						</div>
					</div>
				</div>
			</section>
        </div>
    </div>

    <Footer />
</template>