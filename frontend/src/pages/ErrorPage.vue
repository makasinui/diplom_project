<template>
    <Layout page="error">
        <h1 class="error-title">404</h1>
        <section class="error-body">
            <span>Запрашиваемая страница не найдена</span>
        </section>
    </Layout>
</template>

<style lang="scss">
.error-wrapper {
    text-align:center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .error {
        &-title {
            font-size: 100px;
        }
        &-body span {
            font-size: 50px;
        }
    }
}
</style>