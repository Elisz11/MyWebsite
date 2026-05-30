<script setup>
    const props = defineProps({
        photo: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div class="fixed bg-[rgba(0,0,0,0.5)] z-50 inset-0 flex items-center justify-center w-full h-full" @click.self="$emit('close')">
        <img
            :src="photo.downloadUrl"
            :alt="photo.name"
            loading="lazy"
			decoding="async"
            class="max-w-3/4 max-h-3/4 object-contain rounded-2xl"
        />
    </div>
</template>