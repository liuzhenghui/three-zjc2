import {useEffect, useRef} from "react";
import upperFirst from "lodash-es/upperFirst";
import omit from "lodash-es/omit";
import Reconciler from 'react-reconciler'


// const {Reconciler} = window.ReactReconciler


function applyProps(instance, newProps, oldProps) {
    const sameProps = Object.keys(newProps).filter(
        (key) => newProps[key] === oldProps[key]
    );
    const handlers = Object.keys(newProps).filter(
        (key) => typeof newProps[key] === "function" && key.startsWith("on")
    );
    const filteredProps = omit(newProps, [
        ...sameProps,
        ...handlers,
        "children",
        "key",
        "ref"
    ]);
    if (Object.keys(filteredProps).length > 0) {
        Object.entries(filteredProps).map(([key, value]) => {
            const [targetName, ...entries] = key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .split(" ")
                .reverse();
            // console.log(key, targetName, entries);
            const target = entries
                .reverse()
                .reduce((acc, key) => acc[key.toLowerCase()], instance);
            target[targetName.toLowerCase()] = value;
        });
    }
    if (newProps.ref) {
        newProps.ref.current = instance;
    }
}

const roots = new Map();
const Renderer = Reconciler({
    now: () => Date.now(),
    supportsMutation: true,
    isPrimaryRenderer: false,
    clearContainer() {
    },
    getPublicInstance(instance) {
        // console.log("getPublicInstance", instance);
        return instance;
    },
    getRootHostContext(rootContainerInstance) {
        return {};
    },
    getChildHostContext(parentHostContext, type) {
        return {};
    },
    createInstance(
        type,
        props,
        rootContainerInstance,
        hostContext,
        internalInstanceHandle
    ) {
        // console.log(
        //   "createInstance",
        //   type,
        //   props,
        //   rootContainerInstance,
        //   hostContext,
        //   internalInstanceHandle
        // );
        const instance = new THREE[type.charAt(0).toUpperCase() + type.slice(1)]();
        return instance;
    },
    createTextInstance() {
    },
    appendInitialChild(parentInstance, child) {
        // console.log("appendInitialChild", parentInstance, child);
        if (child) parentInstance.add(child);
    },
    finalizeInitialChildren(instance, type, props, rootContainerInstance) {
        // console.log("finalizeInitialChildren", instance, type, props);
        applyProps(instance, props, {});
    },
    prepareUpdate(
        instance,
        type,
        oldProps,
        newProps,
        rootContainerInstance,
        hostContext
    ) {
    },
    shouldDeprioritizeSubtree(type, props) {
    },
    prepareForCommit() {
    },
    resetAfterCommit() {
    },
    shouldSetTextContent(props) {
    },
    appendChild(parentInstance, child) {
        // console.log("appendChild", parentInstance, child);
        if (child) parentInstance.add(child);
    },
    appendChildToContainer(parentInstance, child) {
        // console.log("appendChildToContainer", parentInstance, child);
        if (child) parentInstance.add(child);
    },
    insertBefore(parentInstance, child, beforeChild) {
    },
    removeChild(parentInstance, child) {
    },
    removeChildFromContainer(parentInstance, child) {
    },
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    },
    schedulePassiveEffects(callback) {
    },
    cancelPassiveEffects(callback) {
    }
});

export function render(element, container) {
    // console.log("custom render");
    let root = roots.get(container);
    if (!root) {
        root = Renderer.createContainer(container);
        roots.set(container, root);
    }

    Renderer.updateContainer(element, root, null, undefined);
    return Renderer.getPublicRootInstance(root);
}

export function unmountComponentAtNode(container) {
    // console.log("unmountComponentAtNode");
}

export function useMeasure() {
}

let updates = [];

export function useFrame(cb) {
    useEffect(() => {
        updates.push(cb);
        return () => {
            updates = updates.filter((f) => f !== cb);
        };
    }, []);
}

// 接受children，props等，返回canvas，通过effect调用自定义的renderer
export function Canvas({children, style, ...props}) {
    // console.log(children, style, props);
    const wrapperRef = useRef();
    const canvasRef = useRef();
    const active = useRef(true);

    useEffect(() => {
        console.log('wrapperRef', wrapperRef.current.offsetWidth)
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            wrapperRef.current.offsetWidth / wrapperRef.current.offsetHeight,
            0.1,
            1000
        );
        renderer.setSize(wrapperRef.current.offsetWidth, wrapperRef.current.offsetHeight);
        camera.position.z = 15;

        const renderLoop = function () {
            if (!active.current) return;
            updates.forEach((u) => {
                u && u();
            });
            requestAnimationFrame(renderLoop);
            renderer.render(scene, camera);
        };

        // 构建场景
        // 使用自定义renderer将children加到场景中
        render(children, scene);

        renderLoop();

        return () => {
            // active.current = false;
            unmountComponentAtNode(scene);
        };
    }, []);

    return (
        <div ref={wrapperRef} style={{width: '100%', height: '100%'}}>
            <canvas ref={canvasRef}/>
        </div>
    )
}
