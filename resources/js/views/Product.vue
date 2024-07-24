<template>
    <div id="app" class="product-page">
        <div class="product-page__product" v-if="!isLoading">
            <div class="product-page__images">
                <button
                    class="product-page__arrow left"
                    :class="{
                        'product-page__arrow--disabled': disabledLeftArrow,
                    }"
                    :disabled="disabledLeftArrow"
                    @click="prevImage"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28px"
                        viewBox="0 -960 960 960"
                        width="28px"
                        fill="black"
                    >
                        <path
                            d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
                        />
                    </svg>
                </button>
                <img
                    alt="product"
                    :src="mainImage"
                    class="product-page__image product-page__image--main_slider"
                />
                <button
                    :class="{
                        'product-page__arrow--disabled': disabledRightArrow,
                    }"
                    :disabled="disabledRightArrow"
                    class="product-page__arrow right"
                    @click="nextImage"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28px"
                        viewBox="0 -960 960 960"
                        width="28px"
                        fill="black"
                    >
                        <path
                            d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
                        />
                    </svg>
                </button>

                <div class="product-page__thumbnails">
                    <template
                        v-for="(image, index) in product?.images"
                        :key="index"
                    >
                        <div
                            class="product-page__thumbnail"
                            :class="{
                                'product-page__thumbnail--active_border':
                                    image === mainImage,
                            }"
                            @click="changeImage(image)"
                        >
                            <img
                                alt="images"
                                :src="image"
                                :class="{
                                    'product-page__thumbnail--active':
                                        image === mainImage,
                                }"
                                class="product-page__thumbnail-img"
                            />
                            <div
                                :class="{
                                    'product-page__thumbnail__overlay':
                                        image === mainImage,
                                }"
                            ></div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="product-page__info">
                <span class="product-page__company-name">Sneaker Company</span>
                <span class="product-page__name">{{ product?.name }}</span>
                <p class="product-page__description">
                    {{ product?.description }}
                </p>
                <div class="product-page__price">
                    <div class="product-page__price__sub">
                        <span class="product-page__price--discounted"
                            >${{ product?.price.discounted }}.00</span
                        >

                        <span class="product-page__price--discount">
                            {{ product?.discount?.amount }}%
                        </span>
                    </div>
                    <div>
                        <span class="product-page__price--original">
                            ${{ product?.price?.full }}.00
                        </span>
                    </div>
                </div>

                <div class="product-page__quantity">
                    <div class="product-page__quantity_action">
                        <button
                            class="product-page__quantity-button"
                            @click="updateQuantity('decrement')"
                        >
                            -
                        </button>
                        <div class="product-page__quantity-value">
                            <div>
                                {{ quantity }}
                            </div>
                        </div>
                        <button
                            class="product-page__quantity-button"
                            @click="updateQuantity('increment')"
                        >
                            +
                        </button>
                    </div>
                    <div class="product-page__add-to-cart">
                        <button
                            class="product-page__add-to-cart product-page__add-to-cart_button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e8eaed"
                            >
                                <path
                                    d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                                />
                            </svg>
                            <div class="product-page__add-to-cart_button_text">
                                Add to cart
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loader-container">
            <span class="loader"></span>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            product: null,
            mainImage: null,
            quantity: 0,
            currentImageIndex: 0,
            isLoading: false,
        };
    },
    created() {
        this.fetchProduct();
    },
    computed: {
        disabledLeftArrow() {
            return this.currentImageIndex + 1 === 1 ? true : false;
        },
        disabledRightArrow() {
            return this.product?.images.length === this.currentImageIndex + 1;
        },
    },
    methods: {
        changeImage(selectedImage) {
            this.mainImage = selectedImage;
        },
        nextImage() {
            if (
                this.product &&
                this.currentImageIndex < this.product.images.length - 1
            ) {
                this.currentImageIndex++;
                this.mainImage = this.product.images[this.currentImageIndex];
            }
        },
        prevImage() {
            if (this.product && this.currentImageIndex > 0) {
                this.currentImageIndex--;
                this.mainImage = this.product.images[this.currentImageIndex];
            }
        },
        async fetchProduct() {
            this.isLoading = true;
            try {
                const endpoint =
                    "/client/products/fall-limited-edition-sneakers";
                const { data } = await axios.get(endpoint);
                this.product = data.data;
                this.mainImage = this.product.images[0];
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        updateQuantity(action) {
            if (action === "increment") {
                this.quantity++;
            } else if (action === "decrement" && this.quantity > 0) {
                this.quantity--;
            }
        },
    },
};
</script>

<style scoped>
.product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
}

.product-page__product {
    display: flex;
    max-width: 900px;
    gap: 100px;
}

.product-page__images {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    display: flex !important;
    justify-content: center;
    align-items: center;
}
.product-page__image {
    max-width: 100%;
    border-radius: 16px;
    margin-bottom: 28px;
    transition: all 0.5s ease-in-out;
}

.product-page__thumbnails {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
}
.product-page__arrow {
    position: absolute;
    background-color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: none;
}

.product-page__arrow.left {
    left: 10px;
    top: 50%;
}

.product-page__arrow.right {
    right: 10px;
    top: 50%;
}

.product-page__thumbnail {
    width: 80px;
    height: 80px;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid transparent;
    position: relative;

    display: inline-block;
    overflow: hidden;
}

.product-page__thumbnail-img {
    display: block;
    width: 100%;
    height: auto;
}

.product-page__thumbnail__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255, 0.6);
}

.product-page__thumbnail--active_border {
    border: 2px solid hsl(26, 100%, 55%);
}

.product-page__info {
    flex: 1;
}
.product-page__name {
    font-size: 36px;
    font-weight: bold;
    display: block;
    margin: 28px 0;
}

.product-page__description {
    margin-bottom: 28px;
    color: #8d8d8d;
}

.product-page__price {
    display: flex;
    flex-direction: column;

    gap: 10px;
    margin: 28px 0;
}
.product-page__price__sub {
    display: flex;
    align-items: center;
}

.product-page__price--discounted {
    font-size: 24px;
    font-weight: bold;
    color: black;
    display: inline-block;
    font-weight: bold;
    margin-right: 10px;
    letter-spacing: 0.1rem;
}

.product-page__price--original {
    text-decoration: line-through;
    margin: 10px 0 28px 0;
    color: #aaa;
}

.product-page__price--discount {
    background: #ffe4e1;
    padding: 4px 11px;
    font-size: 16px;
    font-weight: bold;
    color: hsl(26, 100%, 55%);
    display: inline-block;
    border-radius: 6px;
}

.product-page__quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.product-page__quantity_action {
    background: #eceaea;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex: 1 1 35%;
}

.product-page__quantity-button {
    font-size: 24px;
    width: 42px;
    cursor: pointer;
    color: hsl(26, 100%, 55%);
    background-color: transparent;
    text-align: center;
    font-weight: bold;
    border: 0px solid #ddd;
    padding: 0.4rem;
    width: 33%;
}
.product-page__quantity-button:hover {
    background-color: rgb(223, 223, 223);
}

.product-page__quantity-value {
    font-size: 16px;
    padding: 4px 20px;
    display: flex;
    width: 50px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    width: 33%;
}
.product-page__add-to-cart {
    padding: 00.4rem;
    background: hsl(26, 100%, 55%);
    flex: 1 1 65%;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
}

.product-page__add-to-cart_button {
    background-color: transparent;
    color: white;
    border: none;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}
.product-page__add-to-cart_button_text {
    margin-left: 16px;
    font-size: 1rem;
    font-weight: 500;
}

.product-page__add-to-cart:hover {
    background: darkorange;
}
.product-page__company-name {
    display: none;
    color: hsl(26, 100%, 55%);
    font-size: 1.5rem;
    font-weight: bold;
}

@media only screen and (max-width: 850px) {
    .product-page {
        padding: 0px;
        height: auto;
    }
    .product-page__product {
        flex-direction: column;
        gap: 0px;
    }
    .product-page__name {
        margin: 20px 0;
        margin-bottom: 20px;
    }

    .product-page__description {
        margin-bottom: 20px;
    }

    .product-page__quantity {
        flex-direction: column;
    }
    .product-page__quantity_action {
        flex: 1 1 100% !important;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .product-page__add-to-cart {
        flex: 1 1 100% !important;
        width: 100%;
    }
    .product-page__thumbnails {
        display: none;
    }
    .product-page__image {
        border-radius: 0px;
    }
    .product-page__info {
        padding: 0 20px;
    }

    .product-page__price {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .product-page__company-name {
        display: block;
    }
    .product-page__arrow {
        display: flex;
    }
}

.product-page__arrow--disabled {
    background-color: rgb(183, 183, 183);
}
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.loader {
    width: 62px;
    height: 62px;
    border: 5px solid hsl(26, 100%, 55%);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
