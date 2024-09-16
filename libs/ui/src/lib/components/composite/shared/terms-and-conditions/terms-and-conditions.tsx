import { Timeline, View, Text } from "../../../atomic"

export const TermsConditions = () => {

    return (
        <View
            gap={6}
            direction="column"
            backgroundColor='white'
            padding={10}
            borderRadius='large'>
            <Text variant='title-6' align='center'>
                Términos y Condiciones
            </Text>
            <Timeline>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        1. Protección de Datos Personales
                    </Text>
                    <Text variant='featured-1'>
                        En cumplimiento con la Ley N° 19.628 sobre Protección de la Vida Privada en Chile, nos comprometemos a:
                    </Text>
                    <Text variant='featured-3'>
                        <ul style={{marginLeft: '3rem'}}>
                            <li>Recolectar y procesar sus datos personales de manera lícita y transparente.</li>
                            <li>Utilizar sus datos personales únicamente para los fines específicos que han sido informados.</li>
                            <li>Mantener sus datos personales actualizados y exactos.</li>
                            <li>Implementar medidas de seguridad adecuadas para proteger sus datos contra el acceso, modificación, o divulgación no autorizados.</li>
                        </ul>
                    </Text>
                    Para más detalles, por favor consulte nuestra Política de Privacidad completa.
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        2. Seguridad Cibernética
                    </Text>
                    <Text variant='featured-1'>
                        Nos comprometemos a mantener altos estándares de seguridad cibernética para proteger su información y nuestros sistemas. Esto incluye:
                    </Text>
                    <Text variant='featured-3'>
                        <ul style={{marginLeft: '3rem'}}>
                            <li>Realizar auditorías de seguridad periódicas de nuestros sistemas y procesos.</li>
                            <li>Implementar y mantener medidas de seguridad técnicas y organizativas apropiadas.</li>
                            <li>Realizar pruebas de penetración regulares para identificar y abordar posibles vulnerabilidades.</li>
                            <li>Mantener planes de respuesta a incidentes actualizados para abordar rápidamente cualquier brecha de seguridad potencial.</li>
                        </ul>
                    </Text>
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        3. Transparencia y Consentimiento
                    </Text>
                    <Text variant='featured-1'>
                        Nos comprometemos a ser transparentes sobre cómo recopilamos, usamos y compartimos su información. Además:
                    </Text>
                    <Text variant='featured-3'>
                        <ul style={{marginLeft: '3rem'}}>
                            <li>Obtendremos su consentimiento explícito antes de recopilar o usar sus datos personales.</li>
                            <li>Le proporcionaremos información clara y accesible sobre nuestras prácticas de privacidad.</li>
                            <li>Le daremos control sobre sus datos, incluyendo el derecho a acceder, corregir o eliminar su información personal.</li>
                            <li>Le notificaremos de manera oportuna sobre cualquier cambio en nuestras políticas o en el uso de sus datos.</li>
                        </ul>
                    </Text>
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        4. Responsabilidad y Cumplimiento Continuo
                    </Text>
                    <Text variant='featured-1'>
                        Asumimos la responsabilidad legal por el manejo de sus datos y nos comprometemos a:

                    </Text>
                    <Text variant='featured-3'>
                        <ul style={{marginLeft: '3rem'}}>
                            <li>Monitorear y cumplir con los cambios en las leyes y regulaciones aplicables.</li>
                            <li>Actualizar regularmente nuestras políticas y prácticas para mantener el cumplimiento.</li>
                            <li>Proporcionar capacitación regular a nuestro personal sobre privacidad y seguridad de datos.</li>
                            <li>Cooperar plenamente con las autoridades reguladoras en caso de consultas o investigaciones.</li>
                        </ul>
                    </Text>
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        5. Cambios en los Términos y Condiciones
                    </Text>
                    Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. Le recomendamos que revise periódicamente estos Términos y Condiciones para mantenerse informado de cualquier actualización.
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        6. Contacto
                    </Text>
                    Si tiene alguna pregunta o inquietud sobre estos Términos y Condiciones, nuestra Política de Privacidad, o nuestras prácticas de manejo de datos, por favor contáctenos a través de ....
                </View>
                <View backgroundColor="neutral-faded"  paddingStart={6} paddingBlock={4}>
                    <Text variant='title-6' weight="bold">
                        7. Ley Aplicable
                    </Text>
                    Estos Términos y Condiciones se rigen por las leyes de Chile. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Chile.
                </View>
            </Timeline>
        </View>
    )
}