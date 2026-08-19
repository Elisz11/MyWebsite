<script setup>
    import NavBar from '../components/NavBar.component.vue'
    import Footer from '../components/Footer.component.vue'
    import projectsData from '../assets/projects.json';
    import { ref, onMounted } from 'vue';


    const projects = ref([]);

    onMounted(async () => {
        try {
            projects.value = projectsData;
        } catch (e) {
            console.error("Failed to load projects data", e);
        }
    });

</script>

<template>
    <NavBar />
    
    <div class="flex-1 flex flex-col items-center justify-center">
        <div class="flex flex-col items-center gap-4">
            <h3 class="text-3xl font-bold p-4">Projects</h3>
            <div class="w-4xl border rounded-2xl p-4 border-neutral-700 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg hover:scale-105" v-for="project in projects" :key="project.id">
                <a :href="project.url" target="_blank" class="flex text-left gap-3">
                    <img
                        :src="project.image"
                        class="h-18 w-18 object-cover rounded-lg"
                        :class="{
                            'brightness-0 dark:invert': project.image.toLowerCase().endsWith('.svg')
                        }"
                        :alt="project.name"
                    >
                    <div class="flex flex-col">
                        <h6 class="text-xl">{{ project.name }}</h6>
                        <p class="text-sm">{{ project.description }}</p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <Footer />
</template>
