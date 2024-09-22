"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect } from "react";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  useEffect(() => {
    console.log(geoCodedList)
  },  [geoCodedList]);

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              <span className="text-[9px]">Search</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className=" rounded-lg border shadow-md">
            <input
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a name to search..."
              className="w-full h-[2.5rem] p-3 font-normal border rounded-sm"
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {(!geoCodedList) ? (
                  <p>No Results</p>
                ) : (
                  geoCodedList.map(
                    (
                      item: {
                        name: string;
                        country: string;
                        state: string;
                        lat: number;
                        lon: number;
                      },
                      index: number
                    ) => {
                      const { name, state, country } = item;
                      return (
                        <li
                          key={index}
                          onMouseEnter={() => setHoveredIndex(index)}
                          className={`py-3 px-2 text-sm  rounded-sm cursor-default
                          ${hoveredIndex === index ? "bg-accent" : ""}
                        `}
                          onClick={() => {
                            getClickedCoords(item.lat, item.lon);
                          }}
                        >
                          <p className=" text">
                            {name}, {state && state }, {country}
                          </p>
                        </li>
                      );
                    }
                  )
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;