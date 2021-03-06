const MANIFEST_URL = 'manifest.json'
const localHost = ['127.0.0.1', '172.17.0.2', 'localhost']

async function main() {
    const isLocal = !!~localHost.indexOf(window.location.hostname)  
    console.log('isLocal mesmo com container?', isLocal)
    const manifestJSON = await (await fetch(MANIFEST_URL)).json()
    const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost
    const videoComponent = new VideoComponent()
    const network = new Network({ host })
    const videoPlayer = new VideoMediaPlayer({
        manifestJSON,
        network,
        videoComponent
    })

    videoPlayer.initializeCodec()
    videoComponent.initializePlayer()

    window.nextChunk = (data) => videoPlayer.nextChunk(data) /* chama função pra baixar o vídeo novo */
}

window.onload = main