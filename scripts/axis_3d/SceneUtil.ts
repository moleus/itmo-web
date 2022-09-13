import * as THREE from 'three';

export class SceneUtil {
    static quarterCircle(radius: number, rotationX: number, rotationY: number, rotationZ: number = 0) {
        const geometry = new THREE.CircleBufferGeometry(radius, 32, 0, Math.PI / 2);
        geometry.rotateX(rotationX);
        geometry.rotateY(rotationY);
        geometry.rotateZ(rotationZ);
        return geometry;
    }

    static mergeGeometry(geometries: Array<THREE.BufferGeometry>, material: THREE.Material): THREE.Mesh {
        return geometries.map((geometry) => new THREE.Mesh(geometry, material)).reduce((mainMesh, subMesh) => mainMesh.add(subMesh))
    }
}