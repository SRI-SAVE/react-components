/*
Copyright 2016 SRI International

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default {
  KbId: 'myRange',
  assetURL: '/SAVE/models/environments/range/ShootingRange.dae',
  grouping: {
    name: 'ShootingRange',
    groups: [{
        name: 'environment',
        node: 'environment',
        parts: [ 'grass', 'tree_line', 'sky', 'targets', 'ShootingRangeArea1', 'ShootingRangeArea2', 'ShootingRangeArea3',
          'ShootingRangeArea4', 'ShootingRangeArea5', 'ShootingRangeArea6', 'ShootingRangeArea7', 'ShootingRangeArea8',
        ],
      },
    ],
  },
}
