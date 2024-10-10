'use client';

import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';

interface CharacterProps {
    action?: string;
    name: string;
}

const Character: React.FC<CharacterProps> = ({ action = '', name }) => {
    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF(name) as any;

    const { actions, names } = useAnimations(animations, group);

    React.useEffect(() => {
        if (actions && action) {
            const currentAction = actions[action];

            if(!currentAction) return;

            currentAction.setLoop(2201, 1);
            currentAction.clampWhenFinished = true;

            currentAction.reset().fadeIn(0.5).play();
        }

        return () => {
            actions[action]?.fadeOut(0.5);
        };
    }, [actions, action]);

    React.useEffect(() => {
        if (actions) {
            console.log('Доступные анимации:', Object.keys(actions));
        }
    }, [actions]);

    return (
        <group>
            <primitive ref={group} position={[0, 0, 0]} object={scene} />
        </group>
    );
};

export default Character;
