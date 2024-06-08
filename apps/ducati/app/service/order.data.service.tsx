import { db } from "@ducati/firebase";
import { OrderData } from "@ducati/ui";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


export async function getOrder(uid: string): Promise<OrderData> {
    const customerRef = doc(db, "customer", uid);

    return new Promise(async (resolve, reject) => {
        try {
            if (uid) {
                const customerSnapshot = await getDoc(customerRef);
                if (!customerSnapshot.exists()) {
                    reject(new Error("Customer not found"));
                    return;
                }

                const customerData = customerSnapshot.data();
                const orderIDs: string[] = customerData?.orderID || [];

                if (orderIDs.length === 0) {
                    reject(new Error("No orders found for this customer"));
                    return;
                }

                const latestOrderID = orderIDs[orderIDs.length - 1];
                const orderRef = doc(db, "orders", latestOrderID);
                const orderSnapshot = await getDoc(orderRef);

                if (!orderSnapshot.exists()) {
                    reject(new Error("Order not found"));
                    return;
                }

                const orderData = orderSnapshot.data() as OrderData;
                resolve(orderData);
            } else {
                reject(new Error("Invalid UID"));
            }
        } catch (error) {
            console.error("Error al obtener la orden:", error);
            reject(error);
        }
    });
}

export async function getOrderByNumOrder(numOrder: number): Promise<OrderData> {
    try {
        if (!numOrder) {
            throw new Error("Invalid numOrder");
        }

        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("numOrder", "==", numOrder));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Order not found");
        }

        const orderDoc = querySnapshot.docs[0];
        const orderData = orderDoc.data() as OrderData;
        
        return { id: orderDoc.id, ...orderData };
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        throw error;
    }
}

export async function getOrders(uid: string) {
    try {
        const customerRef = doc(db, "customer", uid);
        const customerSnapshot = await getDoc(customerRef);

        if (customerSnapshot.exists()) {
            const customerData = customerSnapshot.data();
            const orderIDs = customerData.orderID;

            const allOrders: OrderData[] = [];

            for (const orderID of orderIDs) {
                const orderRef = doc(db, "orders", orderID);
                const orderSnapshot = await getDoc(orderRef);

                if (orderSnapshot.exists()) {
                    const orderData = orderSnapshot.data();

                    const formattedOrder = {
                        numOrder: orderData.numOrder,
                        createdDate: orderData.createdDate,
                        user: orderData.user,
                        status: orderData.status,
                        total: orderData.total,
                        ...orderData
                    };

                    allOrders.push({ id: orderSnapshot.id, ...formattedOrder });
                }
            }

            return allOrders;
        } else {
            throw new Error("El cliente no existe");
        }
    } catch (error) {
        console.error("Error al obtener las órdenes del cliente:", error);
        throw error;
    }
}
