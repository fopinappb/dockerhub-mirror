# dockerhub-mirror

As [Docker Hub rate limited pulls](https://www.docker.com/increase-rate-limits/) it became more interesting to use images hosted on *any* other container registry.

Though, some projects are still pushing their image only to Docker Hub.

This repository leverages github actions to mirror any image (Docker Hub or anywhere else) to ghcr.io.

Just fork this repository and run the [mirror action](https://github.com/fopinappb/dockerhub-mirror/actions/workflows/mirror.yml) with the full image name you want to mirror as input parameter.

![image](https://github.com/fopinappb/dockerhub-mirror/assets/63779195/76df6570-c62c-4464-8e00-7023b36d42cb)


> **NOTE**  
> Images are mirrored to tag rather than their own package because `visibility` is always set to `private` when a package is created  
> IMO, it's annoying to have to change visibility via UI every time you add a new image but feel free to modify [mirror.yml](.github/workflows/mirror.yml) if you prefer that in your fork
