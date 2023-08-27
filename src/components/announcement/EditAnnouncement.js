import { API } from 'api';
import DataWidget from 'components/Global/DataWidget';
import AddAnnouncement from "components/announcement/AddAnnouncement"
import { useMemo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const initState = { loading: true, error: null };

const EditAnnouncement = () => {
    const { id } = useParams();
    const [state, setState] = useState(initState);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    
    const getAnnouncement = useCallback(async (id) => {
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const result = await API.get('/announcement/getSingleAnnouncement?announcementId=' + id);
            setCurrentAnnouncement(result.data?.data);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    });

    useMemo(() => {
        getAnnouncement(id);
    }, [id]);

    return (
        <DataWidget title="Announcement details" isError={state.error} isLoading={state.loading}>
            <AddAnnouncement currentAnnouncement={currentAnnouncement} />
        </DataWidget>
    );
};

export default EditAnnouncement;