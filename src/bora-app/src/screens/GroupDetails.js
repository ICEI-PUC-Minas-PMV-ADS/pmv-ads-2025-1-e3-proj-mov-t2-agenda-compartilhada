// screens/GroupDetails.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Modal,
} from 'react-native';

const GroupDetails = ({ navigation, route }) => {
    // State to control the context menu visibility
    const [menuVisible, setMenuVisible] = useState(false);

    // Sample group data
    const group = {
        id: 1,
        name: 'Amigos do Trabalho',
        members: 5,
        initials: 'AT',
        description: '',
        upcoming_events: [
            {
                id: 1,
                name: 'Happy Hour',
                date: 'Today, 7:00 PM',
                location: "Joe's Bar",
            },
        ],
        members_list: [
            {
                id: 1,
                name: 'Pedro Pereira',
                initials: 'P',
                admin: true,
            },
            {
                id: 2,
                name: 'João Silva',
                initials: 'J',
                admin: false,
            },
        ],
    };

    // Component to render event card
    const EventCard = ({ event }) => (
        <View style={styles.eventCard}>
            <View style={styles.eventMarker} />
            <View style={styles.eventInfo}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
        </View>
    );

    // Component to render member card
    const MemberCard = ({ member }) => (
        <View style={styles.memberCard}>
            <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>{member.initials}</Text>
            </View>
            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={[
                    styles.memberStatus,
                    member.admin ? styles.memberAdmin : styles.memberRegular
                ]}>
                    {member.admin ? 'Administrador' : 'Membro'}
                </Text>
            </View>
        </View>
    );

    // Context menu
    const ContextMenu = () => (
        <Modal
            transparent={true}
            visible={menuVisible}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setMenuVisible(false)}
            >
                <View style={styles.contextMenu}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Editar grupo</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Addicionar membros</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Silenciar notificações</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemTextDanger}>Sair do grupo</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Context menu */}
            <ContextMenu />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Detalhes do grupo</Text>

                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => setMenuVisible(true)}
                >
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Group information */}
                <View style={styles.groupInfoContainer}>
                    <View style={styles.groupAvatar}>
                        <Text style={styles.groupInitials}>{group.initials}</Text>
                    </View>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupMembers}>{group.members} membros</Text>
                </View>

                {/* Description */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.descriptionText}>{group.description}</Text>
                </View>

                {/* Upcoming events */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Próximos Eventos</Text>
                    {group.upcoming_events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </View>

                {/* Members */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Membros</Text>
                    <View style={styles.membersContainer}>
                        {group.members_list.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.seeAllBtn}>
                        <Text style={styles.seeAllText}>Ver todos os membros</Text>
                    </TouchableOpacity>
                </View>

                {/* New event button */}
                <TouchableOpacity style={styles.newEventBtn}>
                    <Text style={styles.newEventText}>Novo Evento</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 20,
        color: '#9A9A9D',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    menuButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    menuButtonText: {
        fontSize: 20,
        color: '#7839EE',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    groupInfoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    groupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 12,
    },
    groupInitials: {
        fontSize: 24,
        color: '#9A9A9D',
    },
    groupName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    groupMembers: {
        fontSize: 14,
        color: '#9A9A9D',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 18,
    },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        overflow: 'hidden',
    },
    eventMarker: {
        width: 8,
        height: '100%',
        backgroundColor: '#7839EE',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    eventInfo: {
        padding: 12,
    },
    eventDate: {
        fontSize: 10,
        color: '#9A9A9D',
        marginBottom: 2,
    },
    eventName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 2,
    },
    eventLocation: {
        fontSize: 10,
        color: '#9A9A9D',
    },
    membersContainer: {
        gap: 8,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        padding: 12,
    },
    memberAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    memberInitials: {
        fontSize: 8,
        color: '#9A9A9D',
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333333',
    },
    memberStatus: {
        fontSize: 10,
    },
    memberAdmin: {
        color: '#7839EE',
    },
    memberRegular: {
        color: '#9A9A9D',
    },
    seeAllBtn: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    seeAllText: {
        fontSize: 12,
        color: '#7839EE',
    },
    newEventBtn: {
        backgroundColor: '#7839EE',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    newEventText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    contextMenu: {
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginTop: 60,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuItemText: {
        fontSize: 12,
        color: '#333333',
    },
    menuItemTextDanger: {
        fontSize: 12,
        color: '#FF4B4B',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#EEEEEE',
    },
});

export default GroupDetails;