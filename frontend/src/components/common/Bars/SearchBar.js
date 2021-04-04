import React from 'react';
import { InputGroup, FormControl, Container } from 'react-bootstrap';



const SearchBar = () => {
    return (
            <Container fluid="true" className="mx-auto border-0 col-7">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Zitation Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Search service"
                        aria-label="Search service"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Container>
    );
};



export default SearchBar;