import { messageInTransit } from "./Utils"
export default send_dandelion_message

function send_dandelion_message(peers, message, from_idx, hue = 15, stem, previously_from) {
    let same_message_index = peers[from_idx].messages.findIndex((msg) => msg.message === message)
    if (same_message_index > -1) {
        if (peers[from_idx].messages[same_message_index].stem === 0) {
            //console.log(`${from_idx}: Terminating Message send because a duplicate message is already saved`)
            return false
        }
    }
    let _inTransit = []

    if (stem === undefined) {
        stem = generateStemLength()
        //console.log(`${from_idx}: Generated ${stem} stem length`)
    } else {
        let old_stem = stem
        stem = reviseStemLength(old_stem)
        //console.log(`${from_idx}: Revised ${stem} from ${old_stem}`)
    }
    window.stem = stem
    let selectedPeers = []

    if (stem > 0) {
        //console.log(`${from_idx}: Sending stem of length ${stem}`)
        selectedPeers = selectRandomPeers(peers[from_idx].connected_to, previously_from)
        selectedPeers.forEach((peer) => {
            _inTransit.push(new messageInTransit(peers[from_idx], peers[peer.id]))
        })
    } else {
        //console.log(`${from_idx}: Sending FLUFF MESSAGE`)
        peers[from_idx].connected_to.forEach((peer) => {
            _inTransit.push(new messageInTransit(peers[from_idx], peers[peer.id]))
        })
    }
    if (same_message_index > -1) {
        //console.log(from_idx + ": SAME MESSAGE REPLACING MESSAGE")
        peers[from_idx].messages[same_message_index] = { message: message, hue: hue, sent: _inTransit.length, received: 0, inTransit: _inTransit, stem: stem }
    } else {
        //console.log(from_idx + ": NEW MESSAGE APPENDING MESSAGE")
        peers[from_idx].messages.push({ message: message, hue: hue, sent: _inTransit.length, received: 0, inTransit: _inTransit, stem: stem });
    }
}



function selectRandomPeers(topicPeers, previously_from) {
    const numPeers = 1
    let candidates = []
    const selectedPeers = []

    if (topicPeers !== undefined) {
        // console.log(topicPeers.size + " peers in topic '" + topic + "'")
        candidates = Array.from(topicPeers.values())
        candidates = candidates.filter(item => item.id != previously_from)
        for (let i = 0; i < numPeers; i++) {
            const randomPeer = Math.floor(Math.random() * candidates.length)
            if (candidates[randomPeer] !== undefined) {
                selectedPeers.push(candidates[randomPeer])
                candidates.splice(randomPeer, 1)
            }
        }
        return new Set(selectedPeers)
    } else {
        // console.log('Not enough peers for topic: ' + topic) // Todo: remove and replace with this.log/warning
        return null
    }
}

function generateStemLength() {
    let stemMin = 2
    let stemMax = 8
    return Math.floor(Math.random() * (stemMax - stemMin + 1) + stemMin)
}

function reviseStemLength(
    stemLength
) {
    let stemReductionMin = 1
    let stemReductionMax = stemReductionMin + 1

    const delta = Math.floor(Math.random() * (stemReductionMax - stemReductionMin + 1) + stemReductionMin)

    let newStemLength = stemLength - delta
    if (newStemLength < 0) {
        newStemLength = 0
    }
    return newStemLength
}