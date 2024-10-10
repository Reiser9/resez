'use client';

import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useProgress, Html } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

import Character from './Character';
import { Preloader } from '@/shared/ui/Preloader';

type Props = {
    modelUrl: string;
    action?: string;
};

const Scene: React.FC<Props> = ({ modelUrl, action = 'T-Pose' }) => {
    const { progress } = useProgress();

    return (
        <Canvas>
            <ambientLight intensity={0.5} />

            <directionalLight position={[-5, -5, 5]} intensity={1} />

            <Suspense
                fallback={
                    <Html center>
                        <Preloader page percent={`${progress.toFixed(0)}%`} />
                    </Html>
                }
            >
                <AutoCameraCharacter modelUrl={modelUrl} action={action} />
            </Suspense>

            <Environment preset="sunset" />
        </Canvas>
    );
};

const AutoCameraCharacter: React.FC<Props> = ({ modelUrl, action }) => {
    const group = React.useRef(null);

    useFrame(({ camera }) => {
        if (group.current) {
            const box = new Box3().setFromObject(group.current);
            const size = new Vector3();
            box.getSize(size);
            const center = new Vector3();
            box.getCenter(center);

            const maxDim = Math.max(size.x, size.y, size.z);
            const distance = maxDim * 1;
            camera.position.set(center.x, center.y + size.y * 0.5, distance);
            camera.lookAt(center);
        }
    });

    return (
        <group ref={group}>
            <Character name={modelUrl} action={action} />
        </group>
    );
};

export default Scene;
