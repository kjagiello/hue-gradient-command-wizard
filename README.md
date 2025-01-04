# A command wizard for Hue Gradient lights

A simple wizard for crafting payloads for the Philips Hue-specific 'multicolor'
command.

# Background

When used over Zigbee, you can control the gradient look and effect of the Hue
Gradient lights by sending a special command (0x0) to the manufacturer-specific
cluster (0xFC03). The payload for this command is cryptic, but both [deconz]
and [z2m] communities have done an excellent job deciphering them.

When [adding] the command support for the Hue gradients to [ZHA], I found myself wanting to experiment with the commands a bit and thus, this tools was born.

[deconz]: https://github.com/Koenkk/zigbee-herdsman-converters/blob/7e7e28affbbd423bd5c6b1a20372c27cfc1066cc/src/lib/philips.ts
[z2m]: https://github.com/Koenkk/zigbee-herdsman-converters/blob/7e7e28affbbd423bd5c6b1a20372c27cfc1066cc/src/lib/philips.ts
[adding]: https://github.com/zigpy/zha-device-handlers/pull/3664
[ZHA]: https://github.com/zigpy/zha
