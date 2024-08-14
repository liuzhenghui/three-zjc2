import omit from "lodash-es/omit";
// import Reconciler from 'react-reconciler'
import {ThreeContext} from "./contexts";

const {Reconciler}=ReactReconciler

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

function appendChild(parentInstance, child) {
    console.log('appendChildToContainer parentInstance', parentInstance, child)
    if (parentInstance && child) {
        parentInstance.add(child)
    }
}

const Renderer = Reconciler({
    now: () => Date.now(),
    supportsMutation: true,
    isPrimaryRenderer: false,
    supportsPersistence: false,
    supportsHydration: false,
    noTimeout: -1,
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
        console.log('Reconciler type', type)
        let instance
        if (type === 'primitive') {
            instance = props.object
        } else {
            const {args = [], ...others} = props
            if (!Array.isArray(args)) throw new Error('The args prop must be an array!')
            let typeName = `${type[0].toUpperCase()}${type.slice(1)}`
            instance = new THREE[typeName](...args)
        }
        applyProps(instance, props, {})
        return instance
    },
    createTextInstance() {
    },
    appendInitialChild(parentInstance, child) {
        if (parentInstance && child) parentInstance.add(child);
    },
    finalizeInitialChildren(instance, type, props, rootContainerInstance) {
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
        appendChild(parentInstance, child)
    },
    appendChildToContainer(parentInstance, child) {
        appendChild(parentInstance, child)
    },
    insertBefore(parentInstance, child, beforeChild) {
    },
    removeChild(parentInstance, child) {
        if (parentInstance && child) parentInstance.remove(child)
    },
    removeChildFromContainer(parentInstance, child) {
        if (parentInstance && child) parentInstance.remove(child)
    },
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    },
    schedulePassiveEffects(callback) {
    },
    cancelPassiveEffects(callback) {
    }
})

const roots = new Map();

export function render(children, container) {
    // console.log("custom render");
    let root = roots.get(container);
    if (!root) {
        root = Renderer.createContainer(container);
        roots.set(container, root);
    }

    Renderer.updateContainer(children, root, null, () => undefined);
    return Renderer.getPublicRootInstance(root);
}

export default render