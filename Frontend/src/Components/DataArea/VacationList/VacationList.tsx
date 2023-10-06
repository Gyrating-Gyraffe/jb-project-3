import { Box, Container, Grid, Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { GlobalState } from "../../../Redux/GlobalState";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { ActiveFilters, ComparisonType, FilterAndSort } from "../../../Utils/FilterAndSort";
import followHandler from "../../../Utils/FollowHandler";
import paginationHandler from "../../../Utils/PaginationHandler";
import Copyright from "../../LayoutArea/Copyright/Copyright";
import Hero from "../../LayoutArea/Hero/Hero";
import Loading from "../../LayoutArea/Loading/Loading";
import FilterSortControls from "../FilterSortControls/FilterSortControls";
import VacationCard from "../VacationCard/VacationCard";


function VacationList(): JSX.Element {

    const vacationsPerPage = 10;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [displayedVacations, setDisplayedVacations] = useState<VacationModel[]>([]);
    const [isLoadingVacations, setIsLoadingVacations] = useState<boolean>(true);

    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({ follow: false, hasNotStarted: false, inProgress: false });

    const userFollowIDs = useSelector((state: GlobalState) => state.userFollowIDs);

    const navigate = useNavigate();

    // On mount:
    useEffect(() => {

        // Gets a list of IDs of vacations that the current user is following, passes a useState Set function for re-renders:
        followHandler.getInitialFollowIDs();

        // Get vacations from DB:
        dataService.getAllVacations()
            .then(data => {
                setVacations(data);
                setIsLoadingVacations(false);
            })
            .catch(err => {
                notifyService.error(err);
                navigate('/login');
            });
    }, []);

    // If main vacations collection changes, update displayed vacations (Should only happen on mount):
    useEffect(() => { displayCards(); }, [vacations]);

    // On active filters change, apply filters:
    useEffect(() => { displayCards(); }, [activeFilters, userFollowIDs, currentPage]);

    // Apply all collection modulations and display vacation cards:
    const displayCards = () => {
        let filteredVacations = [...vacations];

        // Apply active filters:
        if (activeFilters.follow) filteredVacations = followHandler.filterByFollow(filteredVacations);

        if (activeFilters.hasNotStarted) filteredVacations = FilterAndSort.filter(filteredVacations, 'startDate', new Date(), ComparisonType.Smaller);

        if (activeFilters.inProgress) {
            filteredVacations = FilterAndSort.filter(filteredVacations, 'startDate', new Date(), ComparisonType.BiggerEqual);
            filteredVacations = FilterAndSort.filter(filteredVacations, 'endDate', new Date(), ComparisonType.SmallerEqual);
        }

        // Apply date sorting:
        filteredVacations = FilterAndSort.sort(filteredVacations, 'startDate');

        const pageNextRender = handlePagination(filteredVacations);

        setDisplayedVacations(paginationHandler.getPageElements(filteredVacations, vacationsPerPage, pageNextRender));
    };

    const handlePagination = (filteredVacations: VacationModel[]): number => {

        // The page count we will have next render:
        const desiredPageCount = getPageCount(filteredVacations);
        setPageCount(desiredPageCount);

        // Lower current page if on next render - page count is lower than current page:
        const adjustedPage = currentPage > desiredPageCount ? (desiredPageCount > 0 ? desiredPageCount : 1) : currentPage;
        setCurrentPage(adjustedPage);

        return adjustedPage;
    };

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const getPageCount = (vacationsArray: VacationModel[]): number => {
        return paginationHandler.getPageCount(vacationsArray, vacationsPerPage);
    }

    if (isLoadingVacations) return <Loading />

    return (
        <>
            {/* Horizontal separator */}
            <Box sx={{ height: 5, bgcolor: '#0288D1' }}></Box>
            <Box sx={{ height: 5, bgcolor: '#24cbd5' }}></Box>

            <Hero />

            {/* Controls for Filters and Sorts for the vacation cards */}
            <FilterSortControls activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

            {/* Card Container */}
            <Container sx={{ py: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
                <Pagination count={pageCount} page={currentPage} showFirstButton showLastButton sx={{ m: 'auto', mt: 0, mb: 10 }} color="secondary"
                    onChange={(e, p) => handlePageChange(e, p)} />

                <Grid container spacing={4} justifyContent={'center'} sx={{ px: 4 }}>
                    {displayedVacations?.length > 0 ? displayedVacations.map(vacation => (
                        <VacationCard vacation={(vacation)}
                            key={vacation.vacationId}
                            followState={followHandler.checkFollow(vacation.vacationId)}
                            onFollow={() => followHandler.handleFollow(vacation)} />
                    )) : <div><h2>It's empty in here. <br /> No vacations found!</h2><br /><p>Try adjusting the filters.</p></div>}
                </Grid>

                <Pagination count={pageCount} page={currentPage} showFirstButton showLastButton sx={{ m: 'auto', mt: 10 }} color="primary"
                    onChange={(e, p) => handlePageChange(e, p) } />
            </Container>

            {/* Footer */}
            <Copyright />
        </>
    );
}

export default VacationList;
