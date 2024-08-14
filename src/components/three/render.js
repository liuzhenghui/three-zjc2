import {useEffect, useRef, useCallback, useState} from "react";
import upperFirst from "lodash-es/upperFirst";

const Renderer = ReactReconciler.Reconciler({
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
        const instance = new THREE[upperFirst(type)]();
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
})

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

export default render