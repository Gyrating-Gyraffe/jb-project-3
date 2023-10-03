import { Box, Stack, Button } from "@mui/material";
import { ActiveFilters } from "../../../Utils/FilterAndSort";

type FilterSortControlsProps = {
    activeFilters: ActiveFilters;
    setActiveFilters: Function;
}

function FilterSortControls(props: FilterSortControlsProps): JSX.Element {
    return (
        <Box sx={{ mt: 2, px: 0, pb: 4 }}>
            <Stack mb={4} direction="row" spacing={2} justifyContent="center">
                <Button color={'info'} variant={props.activeFilters.follow ? "contained" : "outlined"}
                    onClick={() => props.setActiveFilters({ ...props.activeFilters, follow: !props.activeFilters.follow })}>
                    Followed
                </Button>

                <Button color={'info'} variant={props.activeFilters.hasNotStarted ? "contained" : "outlined"}
                    onClick={() => props.setActiveFilters({ ...props.activeFilters, hasNotStarted: !props.activeFilters.hasNotStarted })}>
                    Has Not Started
                </Button>

                <Button color={'info'} variant={props.activeFilters.inProgress ? "contained" : "outlined"}
                    onClick={() => props.setActiveFilters({ ...props.activeFilters, inProgress: !props.activeFilters.inProgress })}>
                    In Progress
                </Button>
            </Stack>
        </Box>
    );
}

export default FilterSortControls;
