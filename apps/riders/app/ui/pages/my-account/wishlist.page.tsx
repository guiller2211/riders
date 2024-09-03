import { Loader, ProductListForPLP, Text, View } from '@riders/ui';
import { useEffect, useState } from 'react';
import { useTypedLoaderData } from 'remix-typedjson';
import type { loader } from '../../../routes/my-account.wishlist';
import { setLikeProduct } from '../../../service/user.data.service';

export default function WishlistPage() {
    const loaderData = useTypedLoaderData<typeof loader>();
    const [wishlist, setWishlist] = useState(loaderData.wishlist);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isGridView, setIsGridView] = useState(true);

    const sendAddProduct = async (value: string) => {

        try {
            setIsLoading(true);

            const result = await setLikeProduct(value, loaderData.uid)
            setMessage(`${result.message}`);
            setWishlist(result.data)
            setShowAlert(true);
            setIsLoading(false);
            setSuccess(result.success)
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage(`${error}`);
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setWishlist(loaderData.wishlist);
    }, [loaderData.wishlist]);
    return (
        <View direction="row" gap={12} backgroundColor='white'
            padding={10}
            borderRadius='large'>
            <View.Item columns={12}>
                <Text variant="featured-1">Productos Deseados</Text>
            </View.Item>
            <View.Item columns={12}>
                {
                    isLoading ?
                        <Loader />
                        :
                        <ProductListForPLP
                            products={wishlist}
                            sendForm={sendAddProduct}
                            isGridView={isGridView}
                        />
                }
            </View.Item>
        </View>
    );
}
