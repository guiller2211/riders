import { Button, FormControl, Select, Text, TextArea, TextField, View, useResponsiveClientValue } from '@riders/ui';
import { useState } from 'react';

export const Contacts = () => {
    const [showCode, setShowCode] = useState(false);

    const handleCodeProduct = (e: string) => {
        e == '1' ? setShowCode(true) : setShowCode(false);
    }

    return (
        <form method="POST">
            <View backgroundColor='white' padding={10} borderRadius="large" gap={5} width={useResponsiveClientValue({ s: undefined, l: 300 })} >
                <View textAlign='center'>
                    <Text variant='title-4' weight='bold'>Contáctanos</Text>
                    <Text variant={useResponsiveClientValue({ s: 'featured-2', l: 'featured-1' })}>Déjanos saber cómo podemos ayudarte. Responderemos a la brevedad.</Text>

                </View>

                <View.Item columns={12}>
                    <View direction='row' gap={10} >
                        <View.Item columns={6}>
                            <FormControl>
                                <FormControl.Label>Nombre</FormControl.Label>
                                <TextField size='xlarge' name="name" placeholder="Valentina" />
                            </FormControl>
                        </View.Item>

                        <View.Item columns={6}>
                            <FormControl>
                                <FormControl.Label>Correo Electrónico</FormControl.Label>
                                <TextField size='xlarge' name="email" placeholder="example@gmail.com" />
                            </FormControl>
                        </View.Item>
                    </View>
                </View.Item>

                <View.Item columns={12}>
                    <FormControl>
                        <FormControl.Label>Tipo de Consulta</FormControl.Label>
                        <Select
                            options={[{ label: "Problema de Orden", value: "1" }, { label: "Consulta", value: "2" }]}
                            onChange={e => handleCodeProduct(e.value)}
                            name="Type"
                            placeholder="Tipo"
                            size="xlarge" />
                    </FormControl>

                </View.Item>

                {
                    showCode &&
                    <View.Item columns={6}>
                        <FormControl>
                            <FormControl.Label>Codigo de Orden</FormControl.Label>
                            <TextField size='xlarge' name="code" placeholder="1234" />
                        </FormControl>
                    </View.Item>
                }

                <View.Item columns={12}>
                    <FormControl>
                        <FormControl.Label>Mensaje</FormControl.Label>
                        <TextArea placeholder="Indique su Problema" size="xlarge" name='message' />
                    </FormControl>
                </View.Item>

                <Button size='xlarge' color='black' fullWidth>
                    Enviar
                </Button>
            </View>
        </form>
    )
}