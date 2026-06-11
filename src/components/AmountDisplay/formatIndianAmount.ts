/** Formats a number using the Indian numbering system (en-IN). */
export function formatIndianAmount(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Splits a formatted amount into animated digits and static separators. */
export function splitIndianAmountDisplay(formattedAmount: string): Array<{ type: 'digit'; value: string } | { type: 'separator'; value: string }> {
  return formattedAmount.split('').map((character) => {
    if (character >= '0' && character <= '9') {
      return { type: 'digit' as const, value: character };
    }

    return { type: 'separator' as const, value: character };
  });
}

export function getIndianAmountDigitCount(value: number, decimals = 0): number {
  return formatIndianAmount(value, decimals).replace(/\D/g, '').length;
}
