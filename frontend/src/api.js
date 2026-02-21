const BASE = 'http://127.0.0.1:11000'

async function request(path, options = {}) {
    const res = await fetch(BASE + path, options)
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `${res.status} ${res.statusText}`)
    }
    try {
        return await res.json()
    } catch (e) {
        return null
    }
}

export const api = {
    
}