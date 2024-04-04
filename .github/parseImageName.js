module.exports = ({context}) => {
    /*
    parse index, remote and tag from full image name
    based on https://github.com/moby/moby/blob/6d30487d2edb5a2a10715a364f7d8c57257f1bdb/registry/search.go#L146-L155
    */
    const imageName = context.payload.inputs.name
    let index = "docker.io"
    let remote = imageName
    let tag = "latest"
    const sepIndex = imageName.indexOf('/');
    if (sepIndex >= 0) {
        const maybeIndex = imageName.slice(0, sepIndex)
        if (maybeIndex.includes(".") || maybeIndex.includes(":") || maybeIndex == "localhost") {
            // has registry
            index = maybeIndex
            remote = imageName.slice(sepIndex + 1)
        }
    }
    const tagSepIndex = remote.indexOf(":")
    if (tagSepIndex >= 0) {
        // has tag
        tag = remote.slice(tagSepIndex + 1)
        remote = remote.slice(0, tagSepIndex)
    }
    return {name: imageName, index: index, remote: remote, tag: tag}
}

if (require.main === module) {
    console.log('running tests')
    const assert = require('assert')
    const call = (name) => module.exports({context: {payload: {inputs: {name}}}})

    assert.deepEqual(
        call("alpine:3.19"),
        {
            name: 'alpine:3.19',
            index: 'docker.io',
            remote: 'alpine',
            tag: '3.19'
        }
    )
    assert.deepEqual(
        call("localhost/alpine"),
        {
            name: 'localhost/alpine',
            index: 'localhost',
            remote: 'alpine',
            tag: 'latest'
        }
    )
    assert.deepEqual(
        call("ghcr.io/alpine:3.17"),
        {
            name: 'ghcr.io/alpine:3.17',
            index: 'ghcr.io',
            remote: 'alpine',
            tag: '3.17'
        }
    )
}
