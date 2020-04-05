import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Accordion, List, Button } from "antd-mobile";
import { DARK_GRAY } from "../../constants/colors";
import filterOptions from "../../assets/data/filterOptions";
import FilterTag from "../Tag/FilterTag";
import FilterOptionButton from "../Button/FilterOptionButton";
import CustomButton from "../../components/Button/CustomButton";
import CustomList from "../../components/List/CustomList";
import {
  FilterAccordion,
  FilterAccordionPanel,
} from "../Accordion/FilterAccordion";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;
const FilterTitle = styled.p`
  color: ${DARK_GRAY};
  margin: 5px;
  font-size: 13px;
`;

export default () => {
  const [modal, setModal] = useState(true);
  const [clickedLabel, setClickedLabel] = useState("");

  const openModal = (label) => (e) => {
    e.preventDefault();
    setModal(true);
    setClickedLabel(label);
  };

  const closeModal = () => {
    setModal(false);
    setClickedLabel("");
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {Object.values(filterOptions).map((filter, idx) => (
        <FilterOptionButton
          handleClick={openModal(filter.label)}
          key={idx}
          label={filter.label}
        />
      ))}
      <Modal
        popup
        visible={modal}
        onClose={closeModal}
        animationType="slide-up"
        afterClose={() => {
          console.log("afterClose");
        }}
      >
        <FilterAccordion className="my-accordion" onChange={onChange}>
          {Object.values(filterOptions).map((filter, idx) => (
            <FilterAccordionPanel header={filter.label} key={idx}>
              {Object.values(filter.options).map((option, idx) => (
                <FilterTag label={option} key={idx} />
              ))}
            </FilterAccordionPanel>
          ))}
        </FilterAccordion>
        <CustomList center="true">
          <List.Item>
            <CustomButton
              // for some reason react wants boolean values for styled components
              inline="true"
              roundborder="true"
              large="true"
              whitebg="true"
            >
              Quit filters
            </CustomButton>
            <CustomButton
              inline="true"
              roundborder="true"
              large="true"
              primary="true"
            >
              Apply filters
            </CustomButton>
          </List.Item>
        </CustomList>
      </Modal>
    </FilterBoxWrapper>
  );
};
