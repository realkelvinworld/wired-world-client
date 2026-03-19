import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown Browser";
  let browserVersion = "Unknown Version";
  let osName = "Unknown OS";
  let deviceType = "Unknown Device";

  // Detect Browser
  if (
    userAgent.includes("Chrome") &&
    !userAgent.includes("Edg") &&
    !userAgent.includes("Brave")
  ) {
    browserName = "Chrome";
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari";
    const match = userAgent.match(/Version\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Edg")) {
    browserName = "Edge";
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browserName = "Opera";
    const match = userAgent.match(/(Opera|OPR)\/([0-9.]+)/);
    if (match) browserVersion = match[2];
  }

  // Detect OS
  if (userAgent.includes("Windows NT")) {
    osName = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    osName = "macOS";
  } else if (userAgent.includes("Linux")) {
    osName = "Linux";
  } else if (userAgent.includes("Android")) {
    osName = "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    osName = "iOS";
  }

  // Detect Device Type
  if (
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent)
  ) {
    deviceType = "Mobile/Tablet";
  } else {
    deviceType = "Desktop";
  }

  return {
    browser: {
      name: browserName,
      version: browserVersion,
    },
    os: osName,
    device: deviceType,
  };
}

// Numer formatter
export const formatCompactNumber = (value: number) => {
  // No compact formatting below 1000
  if (value < 10000) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);
};

// export const formatToLocalString = (value: number | string) => {
//   if (typeof value === "number") {
//     return value.toLocaleString();
//   }

//   // Extract currency prefix and numeric part e.g. "GHS 12741.19"
//   const match = value.match(/^([A-Z]+)\s([\d.]+)$/);
//   if (!match) return value; // fallback if format is unexpected

//   const [, currency, amount] = match;
//   const formatted = parseFloat(amount).toLocaleString();

//   return `${currency} ${formatted}`;
// };
export const formatToLocalString = (value: number | string) => {
  if (typeof value === "number") {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Handle strings like "GHS 16550.00"
  const match = value.match(/([A-Z]+\s?)([\d,]+(\.\d+)?)/);
  if (match) {
    const currency = match[1]; // "GHS "
    const num = parseFloat(match[2].replace(/,/g, ""));

    if (!isNaN(num)) {
      return (
        currency +
        num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  }

  return value; // fallback, return as-is
};

export const formatToTwoDecimal = (value: string) => {
  return parseFloat(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
