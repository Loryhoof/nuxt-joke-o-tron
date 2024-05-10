
<script setup>

    const inputRef = ref("")
    const isLoading = ref(false)

    const objectToShow = ref("")

    const handleSubmit = async (val) => {

        isLoading.value = true

        try {
            const { data, error } = await useFetch(`/api/send?text=${val}`)

            if(error.value) {
                objectToShow.value = `Error: ${error.value.statusMessage}. Please try again.`
            }
            else {
                objectToShow.value = data.value
            }
        }
        catch(err) {
            console.log(err)
        }
       
        isLoading.value = false
    }

    const handleGoBack = () => {
        inputRef.value = ""
        objectToShow.value = ""
    }

</script>

<template>
    <div class="flex flex-col h-screen items-center justify-center">
        <div class="md:w-[480px]">
            <h1 class="text-center font-bold text-5xl mb-12">
                Joker-o-tron
            </h1>
            <div v-if="!objectToShow">
                <input v-model="inputRef" class="border rounded-lg w-full p-4 mb-4" type="text" placeholder="A joke about..."></input>
                <div v-if="!isLoading"><button @click="handleSubmit(inputRef)" class="w-full p-4 font-semibold border bg-gray-100 hover:bg-gray-200" type="submit">Submit Your Shit</button></div>
                <div v-else class="w-full p-4 text-center">Loading...</div>
            </div>
            <div v-else class="flex flex-col w-full p-4 border">
                <div class="font-semibold text-xl mb-4">Response</div>

                
                {{ objectToShow }}
        

                <div class="w-full flex flex-row justify-end gap-4">
                    <button @click="handleSubmit(inputRef)" class="bg-yellow-300 hover:bg-yellow-400 font-semibold text-lg mt-4 p-4"><Icon name="simple-line-icons:reload" size="24px"></Icon></button>
                    <button @click="handleGoBack" class="bg-green-400 hover:bg-green-500 font-semibold text-lg mt-4 p-4">Go Back</button>
                </div>
            </div>
        </div>
    </div>
</template>