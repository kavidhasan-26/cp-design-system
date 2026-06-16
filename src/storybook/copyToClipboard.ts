export async function copyTextToClipboard(text: string): Promise<boolean> {
  const value = text.trim();

  if (typeof window !== 'undefined') {
    if (window.navigator?.clipboard?.writeText) {
      try {
        await window.navigator.clipboard.writeText(value);
        return true;
      } catch {
        // Fall through to execCommand for Storybook iframe restrictions.
      }
    }

    try {
      const textarea = window.document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      window.document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, value.length);
      const copied = window.document.execCommand('copy');
      window.document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }

  return false;
}
