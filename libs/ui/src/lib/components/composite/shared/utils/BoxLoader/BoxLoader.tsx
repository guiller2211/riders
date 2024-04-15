import { View } from "../../../../atomic";
import styles from './BoxLoader.module.css'; // Importar el archivo CSS como un módulo

export const BoxLoader = () => {
    return (
        <View className={styles.loader}> 
            <View className={`${styles.box} ${styles.box0}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box1}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box2}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box3}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box4}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box5}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box6}`}> 
                <View></View>
            </View>
            <View className={`${styles.box} ${styles.box7}`}> 
                <View></View>
            </View>
            <View className={styles.ground}> 
                <View></View>
            </View>
        </View>
    )
}
