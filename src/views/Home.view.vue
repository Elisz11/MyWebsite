<script setup>
    import { computed, ref, onMounted } from 'vue';
    import NavBar from '../components/NavBar.component.vue'
    import Footer from '../components/Footer.component.vue'
    import Photo from '../components/Photo.component.vue';
    import skills from '../assets/skills.json';
    import projects from '../assets/projects.json';
    import galleryData from '../assets/gallery.json';
    
    const mySkills = computed(() => {
        return [...skills]
            .slice(0, 4);
    });

    const featuredProjects = computed(() => {
        return [...projects]
            .filter(project => project.featured === "true")
    });

    const gallery = ref([]);
	const selectedPhoto = ref(null);

    onMounted(async () => {
        try {
            gallery.value = galleryData.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (e) {
            console.error("Failed to load gallery data", e);
        }
        gallery.value = gallery.value.slice(0, 4);
    });

</script>

<template>
    <NavBar />
    <Photo v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
    
    <div class="flex-1 flex flex-col items-center justify-center">
        <div class="w-full max-w-5xl p-2">
            <div class="flex gap-10 items-center justify-center w-full">
                <img src="/favicon.png" class="rounded-full w-48 h-48 border-4 transition-all duration-300 hover:scale-105">
                <div class="w-full max-w-md text-left p-4 border rounded-2xl border-neutral-700 hover:border-neutral-300 text-lg transition-all duration-300 hover:scale-105">
                    <h1 class="text-6xl font-bold">Eli</h1>
                    <span >AKA elisz11</span>
                    <span class="flex items-center gap-1 mt-2"><img src="/icons/pos.svg" class="w-5 h-5 brightness-0 dark:invert" alt="location"><span>Italy and Poland</span></span>
                </div>
            </div>

            <div class="flex items-center justify-center w-full p-4">
                <div class="w-full flex justify-center">
                    <a href="https://www.last.fm/user/elisz11" target="_blank" class="hover:scale-105 transition-all duration-300">
                        <img 
                            src="https://lastfm-recently-played.vercel.app/api?user=elisz11&count=4" 
                            alt="Last.fm recently played tracks" 
                            loading="lazy"
                        />
                    </a>
                </div>

                <div class="w-full flex justify-center">
                    <a href="https://steamcommunity.com/id/elisz11/" target="_blank" class="hover:scale-105 transition-all duration-300">
                        <img
                            src="https://steam-stat-gc6pi4oh5-azizul-haque-anantos-projects.vercel.app/api?profileName=elisz11"
                            alt="Steam recently played games"
                            loading="lazy"
                        />
                    </a>
                </div>
            </div>

            <div class="flex flex-col items-center w-full">
                <h3 class="text-3xl font-bold p-4">My skills</h3>
                <section class="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 px-4">
                    <div class="flex flex-col items-center gap-3 p-4 transition-all duration-300 hover:scale-110" v-for="skill in mySkills" :key="skill.id">
                        <img class="w-16 h-16" :src="skill.image" :alt="skill.name"/>
                        <span class="font-semibold text-lg">{{ skill.name }}</span>
                    </div>
                </section>
            </div>

            <div class="flex flex-col items-center">
                <h3 class="text-3xl font-bold p-4">Featured projects</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                    <div class="border rounded-2xl p-4 border-neutral-700 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg hover:scale-105" v-for="project in featuredProjects" :key="project.id">
                        <a :href="project.url" target="_blank" class="flex text-left gap-3">
                            <img
                                :src="project.image"
                                class="h-18 w-18 object-cover rounded-lg"
                                :class="{
                                    'brightness-0 dark:invert': project.image.toLowerCase().endsWith('.svg')
                                }"
                                :alt="project.name"
                            />
                            <div class="flex flex-col">
                                <h6 class="text-xl">{{ project.name }}</h6>
                                <p class="text-sm">{{ project.description }}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
            <!--
            <div class="flex flex-col items-center">
                <h3 class="text-3xl font-bold p-4">Latest notes</h3>
                <div>
                    Work in progress
                </div>
            </div>
            -->

                <div class="flex flex-col items-center">
                <h3 class="text-3xl font-bold p-4">Latest photos</h3>
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
            </div>
        </div>
    </div>

    <Footer />
</template>
