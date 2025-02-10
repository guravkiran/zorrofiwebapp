import useSettings from "app/hooks/useSettings";

export default function MatxLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <a href="https://www.zorrofi.com">
			<img fetchpriority="high" width="1206" height="254" src="https://zorrofiweb-f8332e4252-endpoint.azureedge.net/wp-content/uploads/2024/12/zorro-logo-white-new.png" class="attachment-full size-full wp-image-246" alt="" srcset="https://zorrofiweb-f8332e4252-endpoint.azureedge.net/wp-content/uploads/2024/12/zorro-logo-white-new.png 1206w, https://zorrofiweb-f8332e4252-endpoint.azureedge.net/wp-content/uploads/2024/12/zorro-logo-white-new-300x63.png 300w, https://zorrofiweb-f8332e4252-endpoint.azureedge.net/wp-content/uploads/2024/12/zorro-logo-white-new-1024x216.png 1024w, https://zorrofiweb-f8332e4252-endpoint.azureedge.net/wp-content/uploads/2024/12/zorro-logo-white-new-768x162.png 768w" sizes="(max-width: 1206px) 100vw, 1206px"/>				</a>
  );
}
