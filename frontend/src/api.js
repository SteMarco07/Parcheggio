import { use } from "react"

const BASE = 'http://127.0.0.1:9080/parcheggi'

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
    fetchParcheggi: () => {
        return request("/park")
    },
    fetchPrenotazioni: () => {
        return [
            {
                id: 1,
                parkingId: 1,
                userId: 1,
                startTime: '2024-06-01T10:00:00Z',
                endTime: '2024-06-01T12:00:00Z',
                lat: 45.555643027580615,
                lng: 10.21607865816928
            },
            {
                id: 2,
                parkingId: 2,
                userId: 2,
                startTime: '2024-06-01T10:00:00Z',
                endTime: '2024-06-01T12:00:00Z',
                lat: 45.556458128508915,
                lng: 10.214501303702997
            },
            {
                id: 3,
                parkingId: 3,
                userId: 3,
                startTime: '2024-06-01T10:00:00Z',
                endTime: '2024-06-01T12:00:00Z',
                lat: 45.5549368476325,
                lng: 10.21519329610318
            }
        ]
    }

}