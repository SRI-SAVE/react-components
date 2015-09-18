
export default {
  KbId: 'myM4',
  assetURL: '/SAVE/models/weapons/M4/M4_noHierarchy.dae',
  grouping: {
    name: 'M4 Carbine',
    parts: [ 'Sling', 'Barrel_Assembly', 'Upper_Handguard', 'Lower_Handguard', 'Small_Sling_Swivel', 'Compensator',
      'Recessed_Washer__OOCompensator', 'Spring_Pin2', 'Spring_Pin3', 'Rear_Handguard_Clamp', 'Screw', 'Gas_Tube_Spring_Pin',
      'Gas_Tube', 'Handguard_Slip_Ring_Spring', 'Handguard_Slip_Ring_Retaining_Ring', 'Handguard_Slip_Ring_LAMA918813252',
      'Front_Sight_Post', 'Headless_Shoulder_Pin', 'Spring3', 'Tubular_Rivet', 'Synchro_Clamp', 'Spring_Pin1', 'Spring_Pin',
      'Swivel_Mount', 'Flat_Spring', 'Special_Shaped_Spacer',
    ],
    groups: [{
        name: 'Buttstock Group',
        parts: [ 'Buttstock', 'Swivel_LAMA1259863095', 'Machine_Screw', 'Buttstock_Release_Lever_Nut', 'Buttstock_Release_Lever',
          'Buttstock_Release_Lever_Screw_LAMA1417807796', 'Buttstock_Release_Lever_Spring_Pin', 'Buttstock_Release_Lever_Spring',
        ],
      }, {
        name: 'Magazine_g Group',
        parts: [ 'Tube', 'Clip_Spring1', 'Base', 'Clip_Spring', 'Follower' ],
        groups: [{
            name: 'Casing1 Group',
            parts: [ 'Casing1', 'Projectile1' ],
          }, {
            name: 'Casing2 Group',
            parts: [ 'Casing2', 'Projectile2'],
          }, {
            name: 'Casing3 Group',
            parts: [ 'Casing3', 'Projectile3' ],
          },
        ],
      }, {
        name: 'Lower_Receiver Group',
        parts: [ 'Lower_Receiver', 'Trigger', 'Trigger_Spring', 'Disconnector_Spring__OOBurst__CC', 'Disconnector_Spring__OOSemi__CC',
          'Trigger_Spring1', 'Trigger_Pin', 'Disconnector__Burst', 'Disconnector__Semi', 'Magazine_Catch', 'Magazine_Catch_Spring',
          'Magazine_Catch_Button', 'Pivot_Pin', 'Pivot_Pin_Detent', 'Pivot_Pin_Spring', 'Takedown_Pin', 'Takedown_Pin_Detent',
          'Takedown_Pin_Detent_Spring', 'Selector_Lever', 'Safety_Detent__OOSelector_Lever__CC', 'Safety_Spring__OOSelector_Lever__CC',
          'Automatic_Sear', 'Automatic_Sear_Spring', 'Sear_Pin', 'Hammer', 'Hammer_Spring1', 'Hammer_Pin', 'Burst_Cam',
          'Burst_Cam_Clutch_Spring', 'Hammer_Spring', 'Lower_Receiver_Extension', 'Buffer', 'Action_Spring', 'Plain_Round_Nut',
          'Receiver_End_Plate', 'Buffer_Retainer', 'Buffer_Retainer_Spring', 'Trigger_Guard', 'Trigger_Guard_Spring_Pin_Retaining_Pin',
          'Trigger_Guard_Detent', 'Trigger_Guard_Detent_Spring', 'Pistol_Grip', 'Pistol_Grip_Screw', 'Pistol_Grip_Lock_Washer',
        ],
        groups: [{
            name: 'Bolt_Catch Group',
            parts: [ 'Bolt_Catch', 'Bolt_Catch_Spring_Pin', 'Bolt_Catch_Plunger', 'Bolt_Catch_Spring' ],
            groups: [{
                name: 'Bolt_Catch_Bottom Group',
              }, {
                name: 'Bolt_Catch_Top Group',
              },
            ],
          }, {
            name: 'PivotPinHead Group',
          }, {
            name: 'PivotPinTail Group',
          }, {
            name: 'TakedownPinHead Group',
          }, {
            name: 'TakedownPinTail Group',
          },
        ],
      }, {
        name: 'Upper_Receiver Group',
        parts: [ 'Upper_Receiver', 'Plunger_Assembly', 'Pawl__Forward_Assist', 'Forward_Assist_Spring', 'Forward_Assist_Spring1',
          'Pawl_Spring_Pin', 'Pawl_Detent', 'Pawl_Spring', 'Cover_Pin', 'Ejection_Port_Cover', 'Cover_Spring',
          'Cover_Retaining_Ring__OOC_Clip__CC',
        ],
        groups: [{
            name: 'Chamber Group',
          }, {
            name: 'Charging_Handle Group',
            parts: [ 'Charging_Handle', 'Charging_Handle_Latch', 'Charging_Handle_Spring', 'Charging_Handle_Spring_Pin' ],
          }, {
            name: 'Key_and_Bolt_Carrier_Assembly Group',
            parts: [ 'Key_and_Bolt_Carrier_Assembly', 'Firing_Pin_Retaining_Pin', 'Firing_Pin' ],
            groups: [{
                name: 'Bolt Group',
                parts: [ 'Bolt', 'Bolt_Cam_Pin', 'Ejector_Spring_Pin', 'Bolt_Ring', 'Bolt_Ring2', 'Bolt_Ring1', 'Ejector', 'Ejector_Spring',
                  'Extractor', 'Extractor_Spring', 'Extractor_Pin', 'Casing4', 'Projectile4',
                ],
              },
            ],
          }, {
            name: 'Gun_Carrying_Handle Group',
            parts: [ 'Gun_Carrying_Handle', 'Windage_Spring_Pin', 'Rear_Sight_Screw', 'Flat_Rear_Sight_Spring', 'Rear_Sight_Base',
              'Sight_Aperture', 'Windage_Knob', 'Spring__Helical__Compression', 'Knob', 'Ball_Bearing1', 'Elevating_Mechanism', 'Spring2',
              'Spring1', 'Index_Screw', 'Ball_Bearing', 'Pin_Spring', 'Spring', 'Ball_Bearing2', 'Round_Nut1', 'Washer1', 'Washer',
              'Clamping_Bar', 'Round_Nut',
            ],
          },
        ],
      },
    ],
  },
}
