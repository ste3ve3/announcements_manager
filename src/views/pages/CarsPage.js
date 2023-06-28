import { Box, CardActions, Grid, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { API, useFetcher } from 'api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { addProject, deleteProject, editProject, getAllProjects } from 'store/actions/project';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import DataWidget from 'components/Global/DataWidget';
import DatePickerValue from 'components/Global/DatePicker';
import ModalDialog from 'components/Global/ModalDialog';
import Sidebar from 'components/Global/Sidebar';
import ProjectCard from 'components/cards/ProjectCard';
import IosSwitch from 'components/extended/IosSwitch';
import ProjectsLoaders from 'components/cards/Skeleton/ProjectsLoaders';
import { compareObj } from 'utils/constants';
import CarsCard from 'components/cards/CarsCard';

const initFormData = {
    projectImage: '',
    isSponsored: false,
    category: 'on going',
    Personnel: '',
    startingDate: '',
    endingDate: '',
    description: '',
    smallDescription: '',
    projectTitle: ''
};

const initState = { loading: false, error: null };

const CarsPage = ({ projects, paginationDetails, getProjects, addProject, editProject, deleteProject }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentProject, setCurrentProject] = useState(null);

    const { data, isError, isLoading } = useFetcher('/registercar?allFields=true');

    console.log(data)

    useEffect(() => {
        if (data?.data?.length) {
            getProjects({ projects: data?.data, paginationDetails: data?.paginationDetails });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentProject) {
            setFormData({
                projectImage: currentProject.projectImage,
                isSponsored: currentProject.isSponsored,
                category: currentProject.category,
                Personnel: currentProject.Personnel,
                startingDate: currentProject.startingDate,
                endingDate: currentProject.endingDate,
                description: currentProject.description,
                smallDescription: currentProject.smallDescription,
                projectTitle: currentProject.projectTitle
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentProject]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentProject) {
                const newObj = compareObj(currentProject, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/projects/update?slug=${currentProject.slug}`, newObj),
                    {
                        loading: `Updating project, please wait...`,
                        success: `Project ${currentProject.projectTitle} updated successfully!`,
                        error: `Something went wrong while updating project`
                    },
                    { position: 'top-right' }
                );
                editProject(result.data.data);
                setCurrentProject(null);
            } else {
                const result = await toast.promise(
                    API.post(`/projects/create`, formData),
                    {
                        loading: `Adding project, please wait...`,
                        success: `Project added successfully!`,
                        error: `Something went wrong while adding project`
                    },
                    { position: 'top-right' }
                );
                addProject(result.data.data);
            }
            setFormData(initFormData);
            setOpenSidebar(false);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };
    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };
    const handleCloseSidebar = () => {
        if (state.loading) return;
        setOpenSidebar(false);
        setCurrentProject(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentProject(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Registered Cars</Typography>
                <Sidebar
                    title={currentProject ? 'Update Project' : 'New Project'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentProject(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <TextField
                        label="Title"
                        color="secondary"
                        value={formData.projectTitle}
                        onChange={(e) => handleChange('projectTitle', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Introduction"
                        color="secondary"
                        multiline
                        rows={4}
                        value={formData.smallDescription}
                        onChange={(e) => handleChange('smallDescription', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        color="secondary"
                        multiline
                        rows={6}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        fullWidth
                        required
                    />
                    <ChooseFileImage
                        selected={formData.projectImage}
                        title="Project Image"
                        onSelect={(selected) => handleChange('projectImage', selected)}
                    />

                    <DatePickerValue
                        label="Starting Date"
                        value={formData.startingDate}
                        onChange={(val) => handleChange('startingDate', val.$d)}
                    />
                    <DatePickerValue
                        label="Ending Date"
                        value={formData.endingDate}
                        onChange={(val) => handleChange('endingDate', val.$d)}
                    />

                    <TextField
                        label="Personnel"
                        color="secondary"
                        value={formData.Personnel}
                        onChange={(e) => handleChange('Personnel', e.target.value)}
                        fullWidth
                        required
                    />

                    <IosSwitch value={formData.isSponsored} onChange={(value) => handleChange('isSponsored', value)} label="Is Sponsored" />
                </Sidebar>
            </Stack>
            <DataWidget
                title="Projects"
                isLoading={isLoading && !projects.length}
                isError={isError && !projects.length}
                isEmpty={!projects.length}
                customLoaders={<ProjectsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {projects.map((project, index) => {
                        return (
                                <CarsCard
                                    car={project}
                                    isActive={currentProject?._id === project._id}
                                    onClick={(action) => {
                                        setCurrentProject(project);
                                        action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                    }}
                                />
                                // <ProjectCard
                                //     project={project}
                                //     isActive={currentProject?._id === project._id}
                                //     onClick={(action) => {
                                //         setCurrentProject(project);
                                //         action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                //     }}
                                // /> 
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete Project?"
                subTitle={`Are you sure do you want to delete this project? `}
                item={currentProject?.projectTitle}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentProject?._id;
                    const title = currentProject?.projectTitle;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/projects/delete/${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Project ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting project, please try again';
                                }
                            }
                        });
                        deleteProject(id);
                    } catch (error) {
                    } finally {
                        handleCloseModal();
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    paginationDetails: state.project.paginationDetails
});

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: (data) => dispatch(getAllProjects(data)),
        addProject: (data) => dispatch(addProject(data)),
        deleteProject: (id) => dispatch(deleteProject(id)),
        editProject: (data) => dispatch(editProject(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
