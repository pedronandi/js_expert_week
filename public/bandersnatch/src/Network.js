class Network {
  constructor({ host }) {
    this.host = host
  }

  parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag}) {
    return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host)
  }

  async fetchFile(url) {
    const response = await fetch(url)
    return response.arrayBuffer()
  }

  async getProperResolution(url) {
    const startMs = Date.now()
    const response = await fetch(url)
    await response.arrayBuffer()
    const endMs = Date.now()
    const durationMs = (endMs - startMs)
    console.log('durationMs', durationMs)

    /* cálculo da resolução por tempo e não por through put */
    const resolutions = [
      {start: 3001, end: 20000, resolution: 144}, /* pior cenário, até 20 seg */
      {start: 901, end: 3000, resolution: 360}, /* até 3 seg */
      {start: 0, end: 900, resolution: 720}, /* menos de 1 seg */
    ]

    const item = resolutions.find(item => {
      return item.start <= durationMs && item.end >= durationMs
    })

    const LOWEST_RESOLUTION = 144

    if(!item) return LOWEST_RESOLUTION

    return item.resolution
  }
}