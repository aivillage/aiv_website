export type RedirectGroup = {
  label: string;
  redirects: { from: string; to: string }[];
};

export const staticRedirectGroups: RedirectGroup[] = [
  {
    label: "Top-level page redirects",
    redirects: [
      { from: "/conduct/", to: "/about/conduct/" },
      { from: "/leadership/", to: "/about/" },
      { from: "/leadership_team/", to: "/about/" },
    ],
  },
  {
    label: "Event redirects",
    redirects: [
      { from: "/events/DEFCON-26/", to: "/events/defcon-26/" },
      { from: "/events/DEFCON-China-1/", to: "/events/defcon-china-1/" },
      { from: "/events/defcon26/", to: "/events/defcon-26/" },
      { from: "/events/defcon27/", to: "/events/defcon-27/" },
      { from: "/events/defcon28/", to: "/events/defcon-28/" },
      { from: "/events/defcon29/", to: "/events/defcon-29/" },
      { from: "/events/defcon30/", to: "/events/defcon-30/" },
      { from: "/events/defcon32/", to: "/events/defcon-32/" },
      { from: "/events/defcon33/", to: "/events/defcon-33/" },
    ],
  },
  {
    label: "Schedule redirects",
    redirects: [
      { from: "/events/2024_talks", to: "/events/defcon-32/talks/" },
      { from: "/events/2024_talks/", to: "/events/defcon-32/talks/" },
      { from: "/schedules/2018-05-01-DECON-China-1.html", to: "/events/defcon-china-1/schedule/" },
      { from: "/schedules/2018-08-01-DEFCON-26.html", to: "/events/defcon-26/schedule/" },
      { from: "/schedules/2019-08-01-DEFCON-27.html", to: "/events/defcon-27/schedule/" },
      { from: "/schedules/2020-08-01-DEFCON-28.html", to: "/events/defcon-28/schedule/" },
    ],
  },
  {
    label: "Legacy aliases",
    redirects: [
      { from: "/sponsors/reality_defender.html", to: "/sponsors/reality-defender/" },
      { from: "/volunteers/bill_stout.html", to: "/about/" },
      { from: "/volunteers/brian_reeves.html", to: "/about/" },
      { from: "/volunteers/emanuel_gawrieh.html", to: "/about/" },
      { from: "/volunteers/lauren_putvin.html", to: "/about/" },
      { from: "/volunteers/mohamed_abumuslim", to: "/about/" },
      { from: "/volunteers/ravin_kumar.html", to: "/about/" },
      { from: "/volunteers/sven.html", to: "/about/" },
      { from: "/volunteers/tal_eliyahu.html", to: "/about/" },
    ],
  },
];
