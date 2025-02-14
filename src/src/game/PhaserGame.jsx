import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame ({ currentActiveScene, isConsoleOpen }, ref)
{
    const game = useRef();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {
        
        if (game.current === undefined)
        {
            game.current = StartGame("game-container");
            
            if (ref !== null)
            {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {

            if (game.current)
            {
                game.current.destroy(true);
                game.current = undefined;
            }

        }
    }, []);

    useEffect(() => {
        EventBus.on('current-scene-ready', (currentScene) => {
            if (ref.current) {  // Ensure ref.current is defined
                ref.current.scene = currentScene;
            }
        });
    
        return () => {
            EventBus.removeListener('current-scene-ready');
        };
    
    }, [currentActiveScene, ref]);

    useEffect(() => {
        if (ref.current?.scene) {
            ref.current.scene.events.emit('toggle-pause', isConsoleOpen);
        }
    }, [isConsoleOpen]);

    return (
        <div id="game-container"></div>
    );

});

// Props definitions
PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func 
}
