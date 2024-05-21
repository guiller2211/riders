import { CheckoutOverviewProp, OrderData } from "@ducati/ui";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../server/firebase.service";


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

                const orderData = orderSnapshot.data().order as OrderData;
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