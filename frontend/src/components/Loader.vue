<template>
    <Transition appear mode="in-out">
        <div class="loading">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style="
                    margin: auto;
                    background: transparent;
                    display: block;
                    shape-rendering: auto;
                "
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
            </svg>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
div.loading {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.4);

    &.v-enter-active,
    &.v-leave-active {
        transition: opacity 0.2s ease;
    }

    &.v-enter-from,
    &.v-leave-to {
        opacity: 0;
    }

    svg {
        max-width: 30px;
    }
}
</style>
