import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import { IconUsers, IconPray, IconUserCheck, IconBrandAsana, IconBrandDisqus, IconArticle, IconUnlink, IconShadow, IconMailOpened } from '@tabler/icons';
import { connect } from 'react-redux';
import { useFetcher } from 'api';

import { getAllFathers } from 'store/actions/father';
import { getUsers } from 'store/actions/auth';
import { getAllLeaders } from 'store/actions/leader';
import { getAllCars } from 'store/actions/cars';
import { getAllBlogs } from 'store/actions/blog';
import { getAllNews } from 'store/actions/news';
import { getAllMessages } from 'store/actions/message';
import { getAllTestimonials } from 'store/actions/testimonial';
import { getAllAnnouncements } from 'store/actions/announcement';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = ({
    priests, 
    getPriests, 
    users, 
    getUsers, 
    leaders, 
    getLeaders, 
    projects, 
    getProjects, 
    blogs, 
    getBlogs, 
    news,
    getNews,
    messages,
    getMessages,
    testimonials,
    getTestimonials,
    announcements, 
    getAnnouncements
}) => {
    // const { data: usersData, isLoading: usersLoading } = useFetcher('/auth/getAllUsers');
    // const { data: projectsData, isLoading: projectsLoading } = useFetcher('/projects?allFields=true');
    // const { data: priestsData, isLoading: priestsLoading } = useFetcher('/priests?all=true');
    // const { data: leadersData, isLoading: leadersLoading } = useFetcher('/leaders?limit=3000000000');
    // const { data: blogsData, isLoading: blogsLoading } = useFetcher('/blog?all=admin');
    // const { data: newsData, isLoading: newsLoading } = useFetcher('/news?all=true');
    // const { data: messagesData, isLoading: messagesLoading } = useFetcher('/messages?all=true');
    // const { data: testimonialsData, isLoading: testimonialsLoading } = useFetcher('/testimonials?all=true');
    // const { data: announcementsData, isLoading: announcementsLoading } = useFetcher('/announcements?all=true');
    // const [isLoading, setLoading] = useState(true);
    // useEffect(() => {
    //     setLoading(false);
    // }, []);
    
    // useEffect(() => {
    //   if (usersData?.registeredUsers?.length) {
    //     getUsers({ users: usersData?.registeredUsers });
    //   }
      
    //   if (projectsData?.data?.length) {
    //     getProjects({
    //       projects: projectsData?.data
    //     });
    //   }

    //   if (priestsData?.data?.length) {
    //     getPriests({ fathers: priestsData?.data });
    //   }

    //   if (leadersData?.data?.length) {
    //     getLeaders({ leaders: leadersData?.data });
    //   }

    //   if (blogsData?.data?.length) {
    //     getBlogs({ blogs: blogsData?.data });
    //   }

    //   if (newsData?.data?.length) {
    //     getNews({ news: newsData?.data });
    //   }

    //   if (messagesData?.data?.length) {
    //     getMessages({ messages: messagesData?.data });
    //   }

    //   if (testimonialsData?.data?.length) {
    //     getTestimonials({ testimonials: testimonialsData?.data });
    //   }

    //   if (announcementsData?.data?.length) {
    //     getAnnouncements({ announcements: announcementsData?.data });
    //   }
    
    // }, [
    //     usersData?.registeredUsers?.length, 
    //     projectsData?.data?.length,
    //     priestsData?.data?.length,
    //     leadersData?.data?.length,
    //     blogsData?.data?.length,
    //     newsData?.data?.length,
    //     messagesData?.data?.length,
    //     testimonialsData?.data?.length,
    //     announcementsData?.data?.length
    // ]);

    return (
        <Grid container spacing={gridSpacing}>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={priestsLoading} icon={<IconPray fontSize="inherit" />} title="Cathedral Priests" count={priests?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={usersLoading} icon={<IconUsers fontSize="inherit" />} title="Registered Users" count={users?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={leadersLoading} icon={<IconUserCheck fontSize="inherit" />} title="Cathedral Leaders" count={leaders?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={projectsLoading} icon={<IconBrandAsana fontSize="inherit" />} title="Projects" count={projects?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={blogsLoading} icon={<IconBrandDisqus fontSize="inherit" />} title="Blogs" count={blogs?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={newsLoading} icon={<IconArticle fontSize="inherit" />} title="News" count={news?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={messagesLoading} icon={<IconMailOpened fontSize="inherit" />} title="Client Messages" count={messages?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={testimonialsLoading} icon={<IconShadow fontSize="inherit" />} title="Testimonials" count={testimonials?.length} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={announcementsLoading} icon={<IconUnlink fontSize="inherit" />} title="Announcements" count={announcements?.length} />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

// const mapStateToProps = (state) => ({
//     projects: state.project.projects,
//     priests: state.father.fathers,
//     users: state.auth.users,
//     leaders: state.leader.leaders,
//     blogs: state.blog.blogs,
//     news: state.news.news,
//     messages: state.message.messages,
//     testimonials: state.testimonial.testimonials,
//     announcements: state.announcement.announcements,
// });

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getProjects: (data) => dispatch(getAllCars(data)),
//         getPriests: (data) => dispatch(getAllFathers(data)),
//         getUsers: (data) => dispatch(getUsers(data)),
//         getLeaders: (data) => dispatch(getAllLeaders(data)),
//         getBlogs: (data) => dispatch(getAllBlogs(data)),
//         getNews: (data) => dispatch(getAllNews(data)),
//         getMessages: (data) => dispatch(getAllMessages(data)),
//         getTestimonials: (data) => dispatch(getAllTestimonials(data)),
//         getAnnouncements: (data) => dispatch(getAllAnnouncements(data)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard;