<template>
  <ul class="chapter-progression-list">
    <ChapterProgressionItem v-for="(val, index) in chapters_completed" :key="index" :is-completed="val"/>
  </ul>
</template>

<script>
export default {
	props: {
		currentChapterIndex: {
			type: Number,
			required: true,
			default: null,
		}
	},
	computed: {
		chapters_completed() {
			const chapters = [0, 1, 2, 3]
			const chaptersCompleted = chapters.map((v) => {
	 	 		if (v <= this.currentChapterIndex) { return true } else { return false }
		  	})
		 	return chaptersCompleted
		}
	},
}
</script>

<style scoped lang="scss">
.chapter-progression-list {
  margin: 0;
  display: flex;
}
</style>
